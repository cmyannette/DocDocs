using Microsoft.AspNetCore.Mvc;

namespace DocDocs.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
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
