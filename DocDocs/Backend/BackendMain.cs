public static class BackendMain {
    public static async Task Main(string[] args)
        {
            await AWSFactory.UploadFileAsync();
        }
}