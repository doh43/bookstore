import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => { // Fetch books when the component loads
    const fetchAllBooks = async () => {
      try {
        // Send a GET request to the server to get a list of books 
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data); // Update the "books" state with date from the server
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks(); // Call when the component is mounted
  }, []); // Empty dependency array makes sure it runs when the component is mounted

  console.log(books);

  // Handles book deletion
  const handleDelete = async (id) => {
    try {
      // DELETE request to the server to delete the book
      await axios.delete(`http://localhost:8800/books/${id}`);
      // Reload the page after deletion
      window.location.reload() // TODO: update using Redux
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Western Bookstore</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;