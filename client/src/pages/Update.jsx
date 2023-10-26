import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Update function
const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  // Parse book ID from the URL
  const bookId = location.pathname.split("/")[2];

  // Function to handle input changes
  const handleChange = (e) => {
    // Update as users type input fields
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle the Update button
  const handleClick = async (e) => {
    e.preventDefault();

    try {

      // PUT request to update book with specified ID
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err); 
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;