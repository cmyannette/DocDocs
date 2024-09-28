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

app.Run();
