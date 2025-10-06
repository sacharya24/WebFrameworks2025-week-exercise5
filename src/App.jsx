import React, { useState, useEffect } from "react";
import RecipeTagList from "./components/RecipeTagList.jsx";
import RecipeList from "./components/RecipeList.jsx";

function App() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error loading tags:", err));
  }, []);

  useEffect(() => {
    if (!selectedTag) return;
    fetch(`https://dummyjson.com/recipes/tag/${selectedTag}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error("Error loading recipes:", err));
  }, [selectedTag]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>ACME Recipe O'Master</h1>

      {!selectedTag ? (
        <RecipeTagList tags={tags} onSelectTag={setSelectedTag} />
      ) : (
        <RecipeList recipes={recipes} onBack={() => setSelectedTag(null)} />
      )}
    </div>
  );
}

export default App;
