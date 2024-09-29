using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DocDocs.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Pcontroller : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public Pcontroller()
        {
            _httpClient = new HttpClient();
        }

        [HttpPost]
        public async Task<IActionResult> GetFileById([FromBody] FileRequest request)
        {
            try
            {
                var pinataUrl = $"https://api.pinata.cloud/v3/files/{request.FileId}";

                // Access the PINATA_JWT from environment variables
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
    }

    public class FileRequest
    {
        public string FileId { get; set; }
    }
}
