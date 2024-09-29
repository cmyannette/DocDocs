using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add CORS to allow requests from your React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // Adjust to your frontend's URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add environment variable configuration for PINATA_JWT (if you use a .env file)
builder.Configuration.AddEnvironmentVariables();

// If using user secrets in development
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();  // Optional: Use for secure secrets
}

var app = builder.Build();

// Configure middleware for error handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Serve static files from wwwroot (if necessary)
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
    RequestPath = "/static"
});

// Apply CORS
app.UseCors("AllowReactApp");

// Enable routing
app.UseRouting();

// Enable authorization if needed
app.UseAuthorization();

// Map the controllers
app.MapControllers();

// Run the application
app.Run();
