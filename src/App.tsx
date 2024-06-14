import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState();

  const onChange = (e) => {
    console.log(e.currentTarget.value);
    setSearch(e.currentTarget.value);
  };

  const onSubmit = () => {
    console.log("Searching for:", search);
    fetch(`http://localhost:3000/api/search?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Search results:", data);
        setResults(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  return (
    <>
      <h1>MiniWiki</h1>
      <div className="search">
        <input
          placeholder="Search..."
          type="text"
          value={search}
          onChange={onChange}
        />
        <button type="submit" onClick={onSubmit}>
          Go
        </button>
      </div>
    </>
  );
}

export default App;
