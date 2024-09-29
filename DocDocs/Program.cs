using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(); // Add MVC services

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Use detailed error page in development
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Use a custom error page in production
    app.UseHsts(); // Enforce strict transport security
}

app.UseHttpsRedirection(); // Redirect HTTP to HTTPS
app.UseStaticFiles(); // Serve static files from wwwroot

app.UseRouting(); // Enable routing

app.UseAuthorization(); // Enable authorization (if needed)

// Define the routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}"); // Set default to the login page

app.MapControllerRoute(
    name: "dashboard",
    pattern: "dashboard",
    defaults: new { controller = "Dashboard", action = "Index" }); // Route for the dashboard

// Run the PinataFileManager Test on Application Startup in a background task
_ = Task.Run(async () => await TestPinataFileManager());

// Run the web application
app.Run();

// Method to test the PinataFileManager functionalities
static async Task TestPinataFileManager()
{
    PinataFileManager manager = new PinataFileManager();

    string filePath = "sample.json";
    try
    {
        // Upload file
        Console.WriteLine("Testing file upload...");
        string fileId = await manager.UploadFileAsync(filePath);
        Console.WriteLine($"File uploaded successfully! File ID: {fileId}");

        
        await Task.Delay(10000);

        // Retry logic for fetching file details
        bool fileFound = false;
        int retryCount = 3;
        while (!fileFound && retryCount > 0)
        {
            Console.WriteLine("Listing all files...");
            string fileList = await manager.ListFilesAsync();
            Console.WriteLine($"Files listed successfully: {fileList}");

            Console.WriteLine("Fetching file details by ID...");
            string fileDetails = await manager.GetFileByIdAsync(fileId);
            if (!string.IsNullOrEmpty(fileDetails))
            {
                Console.WriteLine($"File details retrieved successfully: {fileDetails}");
                fileFound = true;
            }
            else
            {
                retryCount--;
                Console.WriteLine($"File not found. Retries left: {retryCount}");
                await Task.Delay(5000);
            }
        }

        if (!fileFound)
        {
            Console.WriteLine("File could not be found after retries.");
        }
        // else
        // {
        //     // Delete file by ID
        //     Console.WriteLine("Deleting file by ID...");
        //     await manager.DeleteFileByIdAsync(fileId);
        //     Console.WriteLine("File deleted successfully!");
        // }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred: {ex.Message}");
    }
    Console.WriteLine("Test complete.");
}
