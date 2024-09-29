using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(); // Add MVC services

// Add logging service
builder.Services.AddLogging(config =>
{
    config.AddConsole(); // Add console logging
    config.AddDebug(); // Add debug logging
});

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

// Get a logger instance from the services container
var logger = app.Services.GetRequiredService<ILogger<Program>>();

// Run the TestParser method in a background task with logging
_ = Task.Run(async () => await TestParser(logger));

// Run the web application
app.Run();

// Method to test the Parser functionalities with logging
static async Task TestParser(ILogger logger)
{
    Parser parser = new Parser();
    string jsonFilePath = @"TestJob.json"; // Update the path
    string outputFilePath = @"output.txt"; // Update the path


    try
    {
        logger.LogInformation("Testing parser...");

        // Check if the JSON file exists
        if (!File.Exists(jsonFilePath))
        {
            logger.LogError($"Error: JSON file not found at {jsonFilePath}");
            return;
        }
        else
        {
            logger.LogInformation("JSON file found. Starting parsing...");
        }

        // Run the parsing method
        await parser.ParseJsonToTextFileAsync(jsonFilePath, outputFilePath);

        // Confirm if the output file is created
        if (File.Exists(outputFilePath))
        {
            logger.LogInformation("Parsing completed successfully and output file created!");

            // Read and display the parsed content
            string parsedContent = await File.ReadAllTextAsync(outputFilePath);
            logger.LogInformation($"Parsed Content:\n{parsedContent}");
        }
        else
        {
            logger.LogError("Error: Output file was not created. Please check for permission issues.");
        }
    }
    catch (IOException ioEx)
    {
        logger.LogError($"I/O Error: {ioEx.Message}");
    }
    catch (UnauthorizedAccessException uaEx)
    {
        logger.LogError($"Access Error: {uaEx.Message}. Make sure you have write permissions to the directory.");
    }
    catch (Exception ex)
    {
        logger.LogError($"An error occurred during parsing: {ex.Message}");
        logger.LogError($"Stack Trace: {ex.StackTrace}");
    }

    logger.LogInformation("Test complete.");
}
