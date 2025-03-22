using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11.API.Data;

namespace mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) 
        {
            _bookContext = temp;
        }


    [HttpGet]
    public IActionResult GetBooks(
        int pageLength = 5,
        int pageNum = 1,
        string sortBy = "title",
        string sortOrder = "asc")

    {
    var query = _bookContext.Books.AsQueryable();

    // Apply sorting
    if (sortBy.ToLower() == "title")
    {
        query = sortOrder.ToLower() == "desc"
            ? query.OrderByDescending(b => b.Title)
            : query.OrderBy(b => b.Title);
    }

    var totalNumBooks = query.Count();

    var books = query
        .Skip((pageNum - 1) * pageLength)
        .Take(pageLength)
        .ToList();

    var response = new
    {
        Books = books,
        TotalNumBooks = totalNumBooks
    };

    return Ok(response);
}

    }
}
