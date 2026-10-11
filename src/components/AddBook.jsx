//  Create & Edit Features (Form UI)
// Handles input collection, button status toggling (Available / Not Available),
// alert banner notifications, and submitting both new and updated records.

import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ id, setBookId, getBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  
  // State for user feedback alerts (YT FEATURE: Validation & Feedback)
  const [message, setMessage] = useState({ error: false, msg: "" });

  // Handles both Create and Update submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Form input validation
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newBook = { title, author, status };

    try {
      if (id !== undefined && id !== "") {
        // YT Video FEATURE: Edit Feature (Submitting Update)
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        // YT FEATURE: Create Feature (Adding New Entry)
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    // Clear input fields and refresh list
    setTitle("");
    setAuthor("");
    getBooks();
  };

  // YT video FEATURE: Edit Feature (Fetching existing document to pre-fill inputs)
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setAuthor(docSnap.data().author);
        setStatus(docSnap.data().status);
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  // Triggers edit mode when a user selects a book ID to edit
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <div className="p-4 border rounded mb-4 bg-light text-dark">
      {/* Alert banner for error/success messages */}
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBookTitle">
          <InputGroup>
            <InputGroup.Text className="bg-dark text-white fw-bold">B</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text className="bg-dark text-white fw-bold">A</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Book Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        {/* YT video  FEATURE: Availability Toggle Buttons */}
        <ButtonGroup className="mb-3 w-100">
          <Button
            disabled={flag}
            variant="success"
            onClick={() => {
              setStatus("Available");
              setFlag(true);
            }}
          >
            Available
          </Button>
          <Button
            variant="danger"
            disabled={!flag}
            onClick={() => {
              setStatus("Not Available");
              setFlag(false);
            }}
          >
            Not Available
          </Button>
        </ButtonGroup>

        <div className="d-grid gap-2">
          <Button variant="primary" type="Submit">
            {id ? "Update" : "Add/ Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddBook;