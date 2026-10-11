//  Read & Delete Features (Table Rendering)
// Displays database records inside a React-Bootstrap Table with action buttons.

import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";

const BooksList = ({ getBookId, books, getBooks }) => {
  // Fetch books on initial component load
  useEffect(() => {
    getBooks();
  }, []);

  // YT video FEATURE: Delete Feature
  // Deletes record via service layer and refetches the list
  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };

  return (
    <>
      {/* YT video FEATURE: Refresh List Action */}
      <div className="mb-2">
        <Button variant="dark" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* YT video FEATURE: Read Feature (Data Table) */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.title}</td>
              <td>{doc.author}</td>
              <td>{doc.status}</td>
              <td>
                {/* Triggers edit flow by passing document ID to main App state */}
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => getBookId(doc.id)}
                >
                  Edit
                </Button>
                {/* Triggers delete function */}
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(doc.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;