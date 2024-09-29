using System;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
using System.Configuration;
using DotNetEnv;

public class AWSFactory
{
    private const string bucketName = "doc-docs-medical-recordings";
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

    public async Task UploadAudioAsync(string filePath)
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
}