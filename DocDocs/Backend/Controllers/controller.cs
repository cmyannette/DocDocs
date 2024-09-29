using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Microsoft.Extensions.Configuration;
using DotNetEnv;

namespace DocDocs.Backend.Controllers
{
    [ApiController]
    [Route("api/example")]
    public class ExampleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public ExampleController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClient = httpClientFactory.CreateClient();
            Env.Load();
        }

        [HttpGet("get-file-by-id/{id}")]
        public async Task<IActionResult> GetFileById(string id)
        {
            try
            {
                var pinataUrl = $"https://api.pinata.cloud/v3/files/{id}";
                var pinataJwt = Environment.GetEnvironmentVariable("PINATA_JWT");

                if (string.IsNullOrEmpty(pinataJwt))
                {
                    return StatusCode(500, "PINATA_JWT environment variable is not set.");
                }

                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {pinataJwt}");
                var response = await _httpClient.GetAsync(pinataUrl);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Content(content, "application/json");
                }

                return BadRequest("Failed to fetch file from Pinata.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("upload-file")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string name)
        {
            try
            {
                var pinataUrl = "https://api.pinata.cloud/v3/files";
                var pinataJwt = _configuration["PINATA_JWT"];

                if (string.IsNullOrEmpty(pinataJwt))
                {
                    return StatusCode(500, "PINATA_JWT environment variable is not set.");
                }

                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {pinataJwt}");

                using (var content = new MultipartFormDataContent())
                {
                    if (file != null && file.Length > 0)
                    {
                        var streamContent = new StreamContent(file.OpenReadStream());
                        streamContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

                        content.Add(streamContent, "file", file.FileName);
                        content.Add(new StringContent(name), "name");

                        var response = await _httpClient.PostAsync(pinataUrl, content);

                        if (response.IsSuccessStatusCode)
                        {
                            var responseData = await response.Content.ReadAsStringAsync();
                            return Ok(responseData);
                        }

                        return BadRequest("Failed to upload file to Pinata.");
                    }

                    return BadRequest("No file was provided or the file is empty.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
