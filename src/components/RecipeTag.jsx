import React from "react";

function RecipeTag({ tag, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "#f8f8f8",
        cursor: "pointer",
      }}
    >
      {tag}
    </button>
  );
}

export default RecipeTag;
