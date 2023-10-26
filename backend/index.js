import express from "express"; 
import mysql from "mysql2"; 
import cors from "cors"; // Import the CORS middleware for handling cross-origin requests

// Create an Express app
const app = express();
app.use(cors()); // Use the CORS middleware for cross-origin requests
app.use(express.json()); // Use the built-in Express JSON parser for handling JSON data in requests


// Set up a connection to the MySQL database
const db = mysql.createConnection({
  host: "127.0.0.1", // localhost
  user: "root",
  password: "cs3319", 
  database: "test", 
});
 
app.get("/", (req, res) => {
  res.json("Aha, it works!");
});

// Define a route to get a list of books from the database
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"; // Select all rows from the "books" table
  db.query(q, (err, data) => {
    if (err) {
      console.log(err); // Log any database query errors
      return res.json(err); // Return the error response to the client
    }
    return res.json(data); // Return the data as a JSON response
  });
});

// Define a route to add a new book to the database
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title, 
    req.body.desc, 
    req.body.price, 
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err); 
    return res.json(data); 
  });
});

// Delete a book from the database by its primary key
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the URL parameter
  const q = " DELETE FROM books WHERE id = ? "; // SQL query to delete a book by ID

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err); // Return an error response if the database query fails
    return res.json(data); // Return the result of the database operation as a JSON response
  });
});

// Update a book in the database by its ID
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the URL parameter
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?"; 

  const values = [
    req.body.title, 
    req.body.desc,
    req.body.price, 
    req.body.cover, 
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err); 
    return res.json(data);
  });
});

// Start the Express server and listen on port 8800
var listener = app.listen(8800, function () {
  console.log("Server started on port " + listener.address().port); 
});
