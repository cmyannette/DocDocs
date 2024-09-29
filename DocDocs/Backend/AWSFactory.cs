using System;
using System.IO;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
using DotNetEnv;
using System.Collections.Generic;
using Amazon;
using Amazon.BedrockRuntime;
using Amazon.BedrockRuntime.Model;

public class AWSFactory
{
    private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;
    private readonly string accessKey;
    private readonly string secretKey;
    private readonly AmazonS3Client s3Client;
    
    public AWSFactory() {
        Env.Load();
        accessKey = Env.GetString("AWS_ACCESS_KEY");
        secretKey = Env.GetString("AWS_SECRET_ACCESS_KEY");
        s3Client = new AmazonS3Client(accessKey, secretKey, bucketRegion);
    }

    public async Task UploadFileAsync(string filePath, string bucketName)
    {
        try
        {
            var fileTransferUtility = new TransferUtility(s3Client);

            await fileTransferUtility.UploadAsync($".\\{filePath}", bucketName);

            Console.WriteLine("Upload completed");
        }
        catch (AmazonS3Exception e)
        {
            Console.WriteLine("Error encountered on server. Message:'{0}'", e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine("Unknown error encountered. Message:'{0}'", e.Message);
        }
    }

    public async Task<string> GetTranscriptAsync(string fileName)
    {
        try
        {
            var request = new GetObjectRequest
            {
                BucketName = "doc-docs-transcripts",
                Key = $"medical/{fileName}.json"
            };

            using (var response = await s3Client.GetObjectAsync(request))
            using (var reader = new StreamReader(response.ResponseStream))
            {
                string jsonContent = await reader.ReadToEndAsync();
                return jsonContent;
            }
        }
        catch (AmazonS3Exception e)
        {
            Console.WriteLine($"Error encountered on server. Message:'{e.Message}' when reading object");
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Unknown encountered on server. Message:'{e.Message}' when reading object");
            throw;
        }
    }

    public async Task TranscribeFileAsync(string fileName, string jobName)
    {
        var transcribeClient = new AmazonTranscribeServiceClient(accessKey, secretKey, bucketRegion);

        var request = new StartMedicalTranscriptionJobRequest
        {
            MedicalTranscriptionJobName = jobName,
            LanguageCode = "en-US",
            Media = new Media
            {
                MediaFileUri = $"s3://doc-docs-medical-recordings/{fileName}"
            },
            OutputBucketName = "doc-docs-transcripts",
            Specialty = "PRIMARYCARE",
            Type = "CONVERSATION",
            Settings = new MedicalTranscriptionSetting
            {
                MaxSpeakerLabels = 2,
                ShowSpeakerLabels = true,
                ShowAlternatives = false
            },
            ContentIdentificationType = "PHI"
        };

        try
        {
            var response = await transcribeClient.StartMedicalTranscriptionJobAsync(request);
            Console.WriteLine($"Started medical transcription job: {response.MedicalTranscriptionJob.MedicalTranscriptionJobName}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error starting transcription job: {e.Message}");
        }
    }


    public async Task<string> SummarizeNotes()
    {
        // Create a Bedrock Runtime client
        var client = new AmazonBedrockRuntimeClient(accessKey, secretKey, bucketRegion);

        // Set the model ID for Claude
        var modelId = "anthropic.claude-3-5-sonnet-20240620-v1:0";

        string filePath = ".\\output.txt";
        string fileContent = "";
        try
        {
            fileContent = File.ReadAllText(filePath);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }

        // Create the request
        var request = new ConverseRequest
        {
            ModelId = modelId,
            Messages = new List<Message>
            {
                new Message
                {
                    Role = ConversationRole.User,
                    Content = new List<ContentBlock> { new ContentBlock { Text = "You are a medical professional in charge of generating SOAP style notes of medical transcripts between a doctor and a patient. Take notes on this conversation:\n" + fileContent } }
                }
            },
            InferenceConfig = new InferenceConfiguration()
            {
                MaxTokens = 512,
                Temperature = 0.33F,
                TopP = 0.9F
            }
        };

        try
        {
            // Send the request to Bedrock and wait for the response
            var response = await client.ConverseAsync(request);

            // Extract and return the response text
            return response?.Output?.Message?.Content?[0]?.Text ?? string.Empty;
        }
        catch (AmazonBedrockRuntimeException e)
        {
            Console.WriteLine($"ERROR: Can't invoke '{modelId}'. Reason: {e.Message}");
            throw;
        }
    }
}