using System;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using System.Configuration;
using DotNetEnv;

public static class AWSFactory
{
    private const string bucketName = "doc-docs-medical-recordings";
    private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;

    public static async Task UploadFileAsync(string filePath)
    {
        Env.Load();
        string accessKey = Env.GetString("AWS_ACCESS_KEY");
        string secretKey = Env.GetString("AWS_SECRET_ACCESS_KEY");

        var s3Client = new AmazonS3Client(accessKey, secretKey, bucketRegion);
        try
        {
            var fileTransferUtility = new TransferUtility(s3Client);

            // Upload a file
            await fileTransferUtility.UploadAsync(filePath, bucketName);
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
}