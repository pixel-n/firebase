//  Root Application Layout & State Management
// Integrates AddBook and BooksList components while keeping data double-synced 
// across Firestore and Browser LocalStorage.

import { useState, useEffect } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import BookDataService from "./services/book.services";

function App() {
  const [bookId, setBookId] = useState("");

  // Initializes state from LocalStorage if available for instant rendering
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("local_books");
    return saved ? JSON.parse(saved) : [];
  });

  const getBookIdHandler = (id) => {
    setBookId(id);
  };

  // YT  video FEATURE: Read Feature + LocalStorage Sync
  // Retrieves data from Firestore and mirror-saves it to local storage
  const getBooks = async () => {
    try {
      const data = await BookDataService.getAllBooks();
      const fetchedBooks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(fetchedBooks);
      
      // Save snapshot to browser Local Storage
      localStorage.setItem("local_books", JSON.stringify(fetchedBooks));
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} getBooks={getBooks} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} books={books} getBooks={getBooks} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;