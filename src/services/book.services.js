//  CRUD Operation Service Layer
// Centralizes all Firebase Firestore database methods into a single class module 

import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Reference to the 'books' collection in Firestore
const bookCollectionRef = collection(db, "books");

class BookDataService {
  // YT Video  FEATURE: Create Feature - Adds a new document to Firestore
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };

  // YT Video FEATURE: Edit/Update Feature - Updates an existing document by ID
  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  };

  // YT Video FEATURE: Delete Feature - Removes a document from Firestore by ID
  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  };

  // YT Video FEATURE: Read Feature - Fetches all documents from the 'books' collection
  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  // Fetch a single document by ID to pre-fill the form during editing
  getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
}

export default new BookDataService();