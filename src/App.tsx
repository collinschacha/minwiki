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
      // console.log(data);
      const datas = Object.values(data).map((result) => ({
        pageid: result.pageid,
        title: result.title,
        extract: result.extract,
      }));
      setResults(datas);

      console.log(datas);
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
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.pageid} style={{ marginBottom: "20px" }}>
            <h2>{result.title}</h2>
            {result.thumbnail && (
              <img
                src={result.thumbnail.source}
                alt={result.title}
                style={{
                  width: result.thumbnail.width,
                  height: result.thumbnail.height,
                }}
              />
            )}
            <p>{result.extract}</p>
          </div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </>
  );
}

export default App;
