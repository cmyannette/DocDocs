public static class BackendMain {

    private const string filePath = "Stomach_Issues_Demo.m4a";
    private const string transcriptName = "MedicalTranscript1";
    private const string outputPath = "Stomach_Issues_Transcript";
    private const string medicalRecordingsBucket = "doc-docs-medical-recordings";
    private const string outputsBucket = "doc-docs-outputs";

    public static async Task Main(string[] args)
    {
        // Get call recording from Zoom Cloud
        
        

        // Upload File to AWS S3 Bucket
        AWSFactory AWS = new AWSFactory();
        await AWS.UploadFileAsync(filePath, medicalRecordingsBucket);

        // Transcribe file from S3 Bucket
        await AWS.TranscribeFileAsync(filePath, transcriptName);
        string transcript = await AWS.GetTranscriptAsync(transcriptName);
        JsonParser parser = new JsonParser();
        await parser.ParseJsonToTextFileAsync(outputPath, ".\\output.txt");

        //string response = await AWS.SummarizeNotes();
        //Console.WriteLine(response);
    }
}