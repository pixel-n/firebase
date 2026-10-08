import React from "react";

// Card component to display single blog posts with action controls
export default function PostItem({ post, handleEdit, handleDelete }) {
  return (
    <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 p-6 rounded-2xl shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full font-bold border border-indigo-500/20">
            Firestore
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-700/50 text-xs">
        <span className="text-slate-500 font-medium">Real-time synced</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEdit(post)}
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-pen text-xs"></i> Edit
          </button>
          <button
            onClick={() => handleDelete(post.id)}
            className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-trash text-xs"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
}