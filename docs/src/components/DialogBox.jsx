import React from "react";
export default function DialogBox({ title, text, onClose }) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-green-950 bg-opacity-90 border-4 border-green-400 rounded-lg px-6 py-4 z-50 max-w-lg shadow-lg font-pixel text-green-100">
      <h2 className="text-xl mb-2 font-bold">{title}</h2>
      <div className="mb-4 whitespace-pre-line">{text}</div>
      <button
        className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-green-100 font-bold"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}