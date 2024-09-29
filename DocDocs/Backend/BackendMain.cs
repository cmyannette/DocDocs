public static class BackendMain {

    private const string filePath = "small-test.mp3";
    private const string transcriptName = "smallTest";

    public static async Task Main(string[] args)
        {
            // Get call recording from Zoom Cloud
            
            

            // Upload File to AWS S3 Bucket
            AWSFactory AWS = new AWSFactory();
            //await AWS.UploadAudioAsync(filePath);

            // Transcribe file from S3 Bucket
            //await AWS.TranscribeFileAsync(filePath, transcriptName);
            string transcript = await AWS.GetTranscriptAsync(transcriptName);
            Console.WriteLine(transcript);
        }
}