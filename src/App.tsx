import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    console.log(e.currentTarget.value);
    setSearch(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${search}&origin=*`
      );
      const data = await response.data.query.pages;
      console.log(data);
      setResults(data);
      console.log(results);
    } catch (Error) {
      console.log(Error);
    }
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
