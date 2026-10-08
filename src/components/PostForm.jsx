import React, { useEffect } from "react";

export default function PostForm({ title, setTitle, content, setContent, editId, handleSubmit, handleCancel }) {
  
  //  Load saved draft from localStorage when the component mounts
  useEffect(() => {
    if (!editId) {
      const savedTitle = localStorage.getItem("draft_title");
      const savedContent = localStorage.getItem("draft_content");
      if (savedTitle) setTitle(savedTitle);
      if (savedContent) setContent(savedContent);
    }
  }, [editId, setTitle, setContent]);

  //  Save typed changes to localStorage as a draft
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!editId) localStorage.setItem("draft_title", val);
  };

  const handleContentChange = (e) => {
    const val = e.target.value;
    setContent(val);
    if (!editId) localStorage.setItem("draft_content", val);
  };

  //  Clear draft from localStorage upon publishing
  const onSubmitWithClear = async (e) => {
    await handleSubmit(e);
    localStorage.removeItem("draft_title");
    localStorage.removeItem("draft_content");
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 p-6 md:p-8 rounded-2xl shadow-xl mb-10 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold">
          <i className={`fa-solid ${editId ? "fa-pen-to-square" : "fa-plus"}`}></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {editId ? "Update Article" : "Create New Post"}
          </h2>
          <p className="text-xs text-slate-400">Fill in the details below to publish directly to Firestore.</p>
        </div>
      </div>

      <form onSubmit={onSubmitWithClear} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Post Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="e.g., Getting Started with React & Firebase"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Content Body
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your article content here..."
            rows="4"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2"
          >
            <i className={`fa-solid ${editId ? "fa-arrows-rotate" : "fa-paper-plane"}`}></i>
            {editId ? "Save Changes" : "Publish Post"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-5 py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}