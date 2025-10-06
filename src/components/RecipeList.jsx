import React from "react";
import Recipe from "./Recipe.jsx";

function RecipeList({ recipes, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        ⬅ Back to Tags
      </button>
      <h2>Recipes:</h2>
      <div style={{ display: "grid", gap: "20px" }}>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
