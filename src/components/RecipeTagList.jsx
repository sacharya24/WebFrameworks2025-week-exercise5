import React from "react";
import RecipeTag from "./RecipeTag.jsx";

function RecipeTagList({ tags, onSelectTag }) {
  return (
    <div>
      <h2>Select a Recipe Tag:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {tags.map((tag, index) => (
          <RecipeTag key={index} tag={tag} onClick={() => onSelectTag(tag)} />
        ))}
      </div>
    </div>
  );
}

export default RecipeTagList;
