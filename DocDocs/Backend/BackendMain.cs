public static class BackendMain {

    private const string filePath = ".\\Patient_Provider_Demo.m4a";

    public static async Task Main(string[] args)
        {
            // Get call recording from Zoom Cloud
            
            

            // Upload File to AWS S3 Bucket
            await AWSFactory.UploadFileAsync(filePath);
        }
}