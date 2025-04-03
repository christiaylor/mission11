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


    [HttpGet("all")]
    public IActionResult GetBooks(
        int pageLength = 5,
        int pageNum = 1,
        [FromQuery]
        List<string>? categories= null)
        //string sortBy = "title",
        //string sortOrder = "asc"
        {
            var query = _bookContext.Books.AsQueryable();
    if (categories != null && categories.Any())
    {
        query = query.Where(b => categories.Contains(b.Category));
    }


            // Apply sorting
            //if (sortBy.ToLower() == "title")
            //{
            //    query = sortOrder.ToLower() == "desc"
            //        ? query.OrderByDescending(b => b.Title)
            //        : query.OrderBy(b => b.Title);
            //}

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

        [HttpGet("GetCategories")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);

        }


        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;


            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);

        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });

            }
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }

    }
}
