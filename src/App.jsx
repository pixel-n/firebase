import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  // Subscribe to real-time Firestore updates[cite: 1]
  useEffect(() => {
    const postsRef = collection(db, "posts");
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  // Handle post creation and edits[cite: 1]
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editId) {
      const postRef = doc(db, "posts", editId);
      await updateDoc(postRef, { title, content });
      setEditId(null);
    } else {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: serverTimestamp(),
      });
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  // Delete post entry[cite: 1]
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header section */}
      <header className="mb-10 text-center">
        <span className="inline-block bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20 mb-3">
          React + Firebase BaaS
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Blog CMS Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
          Manage your cloud-stored articles using real-time Firestore database synchronization.
        </p>
      </header>

      {/* Form component */}
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        editId={editId}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />

      {/* Post cards list */}
      <section className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-200">
            Published Posts
          </h2>
          <span className="bg-slate-800 text-slate-400 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700">
            Total: {posts.length}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-10 text-center">
            <i className="fa-regular fa-folder-open text-3xl text-slate-600 mb-3"></i>
            <p className="text-slate-400 font-medium text-sm">No blog posts found.</p>
            <p className="text-slate-500 text-xs mt-1">Use the form above to add your first article!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        )}
      </section>
    </div>
  );
}