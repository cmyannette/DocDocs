using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using DotNetEnv;

public class PinataFileManager
{
    private readonly string jwtToken;

    // Constructor to initialize API credentials from environment variables
    public PinataFileManager()
    {
        // Load environment variables from .env file
        DotNetEnv.Env.Load();

        // Retrieve the JWT token
        this.jwtToken = Environment.GetEnvironmentVariable("PINATA_JWT");
    }

    // Method to upload a file to Pinata
    public async Task<string> UploadFileAsync(string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"File not found: {filePath}");
        }

        try
        {
            using (var client = new HttpClient { BaseAddress = new Uri("https://uploads.pinata.cloud/") })
            using (var content = new MultipartFormDataContent())
            {
                var fileContent = new ByteArrayContent(File.ReadAllBytes(filePath));
                fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
                {
                    Name = "\"file\"",
                    FileName = $"\"{Path.GetFileName(filePath)}\""
                };
                fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/octet-stream");
                content.Add(fileContent);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);

                HttpResponseMessage response = await client.PostAsync("v3/files", content);

                string responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Upload Response Status: {response.StatusCode}");
                Console.WriteLine($"Response Content: {responseContent}");

                if (response.IsSuccessStatusCode)
                {
                    dynamic result = JsonConvert.DeserializeObject(responseContent);
                    return result.data.id.ToString(); // Returning the file ID
                }
                else
                {
                    Console.WriteLine($"Response Reason: {response.ReasonPhrase}");
                    throw new Exception($"Error uploading file: {response.ReasonPhrase}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }

    // Method to list all files
    public async Task<string> ListFilesAsync()
    {
        try
        {
            using (var client = new HttpClient { BaseAddress = new Uri("https://api.pinata.cloud/") })
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);

                HttpResponseMessage response = await client.GetAsync("v3/files");

                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    return responseContent;
                }
                else
                {
                    Console.WriteLine($"List Response Status: {response.StatusCode}");
                    Console.WriteLine($"Response Reason: {response.ReasonPhrase}");
                    Console.WriteLine("Response Content:");
                    Console.WriteLine(await response.Content.ReadAsStringAsync());
                    throw new Exception($"Error listing files: {response.ReasonPhrase}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }

    // Method to get file details by ID
    public async Task<string> GetFileByIdAsync(string fileId)
    {
        if (string.IsNullOrWhiteSpace(fileId))
        {
            throw new ArgumentException("Invalid file ID provided.");
        }

        try
        {
            using (var client = new HttpClient { BaseAddress = new Uri("https://api.pinata.cloud/") })
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);

                HttpResponseMessage response = await client.GetAsync($"v3/files/{fileId}");

                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    return responseContent;
                }
                else
                {
                    Console.WriteLine($"Response Status: {response.StatusCode}");
                    Console.WriteLine($"Response Reason: {response.ReasonPhrase}");
                    Console.WriteLine("Response Content:");
                    Console.WriteLine(await response.Content.ReadAsStringAsync());
                    throw new Exception($"Error retrieving file: {response.ReasonPhrase}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }

    // Method to delete a file by ID
    public async Task DeleteFileByIdAsync(string fileId)
    {
        try
        {
            using (var client = new HttpClient { BaseAddress = new Uri("https://api.pinata.cloud/") })
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);

                HttpResponseMessage response = await client.DeleteAsync($"v3/files/{fileId}");

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"DeleteID Response Status: {response.StatusCode}");
                    Console.WriteLine($"Response Reason: {response.ReasonPhrase}");
                    Console.WriteLine("Response Content:");
                    Console.WriteLine(await response.Content.ReadAsStringAsync());
                    throw new Exception($"Error deleting file: {response.ReasonPhrase}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }
}
