using System;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using System.Configuration;

public static class AWSFactory
{
    private const string bucketName = "doc-docs-medical-recordings";
    private const string filePath = "C:\\Users\\carte\\OneDrive\\Documents\\HackMidwest\\DocDocs\\Patient_Provider_Demo.m4a";
    private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;

    public static async Task UploadFileAsync()
    {
        string accessKey = "AKIAYINTLKSUY63B2NUM";
        string secretKey = "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";

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