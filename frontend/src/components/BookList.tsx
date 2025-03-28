import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join('&');

      const url = `https://localhost:5000/api/Book/all?pageLength=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`;

      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // FIXED
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  return (
    <div
      className="container my-4"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <h1 className="text-center text-primary">Book Store</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" key={b.bookID} className="card bg-light mb-3 shadow">
          <h3
            className="card-title text-dark"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {b.title}
          </h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="badge bg-dark text-light">
                <strong>Author: </strong>
                {b.author}
              </li>
              <li className="badge bg-dark text-light">
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li className="badge bg-dark text-light">
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <br />
              <li className="badge bg-dark text-light">
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li className="badge bg-dark text-light">
                <strong>Category: </strong>
                {b.category}
              </li>
              <li className="badge bg-dark text-light">
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <br />
              <li className="badge bg-dark text-light">
                <strong>Price: </strong>
                {b.price}
              </li>
            </ul>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}

      <div className="pagination justify-content-center my-4">
        <button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
          className="btn btn-outline-primary"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
            className={`btn ${pageNum === index + 1 ? 'btn-info' : 'btn-outline-info'} mx-1`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
          className="btn btn-outline-primary"
        >
          Next
        </button>
      </div>

      <div className="d-flex justify-content-center">
        <label className="mr-2">Results per page:</label>
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
          className="form-select w-auto"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
