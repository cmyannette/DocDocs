public static class BackendMain {
    public static async Task Main(string[] args)
        {
            // Get call recording from Zoom Cloud
            
            string filePath = ".\\Patient_Provider_Demo.m4a";

            // Upload File to AWS S3 Bucket
            await AWSFactory.UploadFileAsync(filePath);
        }
}