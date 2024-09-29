using Microsoft.AspNetCore.Mvc;

namespace DocDocs.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {


// GET api/pcontroller/get-file-by-id/{id}
        [HttpGet("get-file-by-id/{id}")]

        // POST api/pcontroller/upload-file
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
                    // Add the file content
                    if (file != null && file.Length > 0)
                    {
                        var streamContent = new StreamContent(file.OpenReadStream());
                        streamContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

                        // Add the file and name to the form data
                        content.Add(streamContent, "file", file.FileName);
                        content.Add(new StringContent(name), "name");

                        // Send the request to Pinata
                        var response = await _httpClient.PostAsync(pinataUrl, content);

                        if (response.IsSuccessStatusCode)
                        {
                            var responseData = await response.Content.ReadAsStringAsync();
                            return Ok(responseData);  // Return the success response from Pinata
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
        
        public async Task<IActionResult> GetFileById(string id)
        {
            try
            {
                var pinataUrl = $"https://api.pinata.cloud/v3/files/{id}";

                // Retrieve the PINATA_JWT from environment variables
                var pinataJwt = _configuration["PINATA_JWT"];

                if (string.IsNullOrEmpty(pinataJwt))
                {
                    return StatusCode(500, "PINATA_JWT environment variable is not set.");
                }

                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {pinataJwt}");

                // Make the GET request to the Pinata API
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

        // GET: api/example
        [HttpGet]
        public IActionResult GetData()
        {
            // You can return JSON or any other data
            var data = new { Name = "Example", Description = "Controller Example Data" };
            return Ok(data);
        }

        // POST: api/example
        [HttpPost]
        public IActionResult PostData([FromBody] ExampleData data)
        {
            // Handle posted data
            if (data == null)
            {
                return BadRequest("Invalid data");
            }
            return Ok($"Received: {data.Name}");
        }
    }

    public class ExampleData
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
