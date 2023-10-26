import axios from "axios"; // Axios for HTTP requests
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Add function 
const Add = () => {
  const [book, setBook] = useState({
    // State variables
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  // Get navigate function from React Router
  const navigate = useNavigate();

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    // Update the book information as users type in the input fields
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle Add button click
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  // Rendering
  return (
    <div className="form">
      <h1>Add New Book</h1>
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
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;