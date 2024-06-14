import { useState } from "react";
import "./App.css";
import axios from "axios";

interface Result {
  pageid: number;
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setSearch(e.currentTarget.value);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Searching for:", search);
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${search}&origin=*`
      );
      const data = await response.data.query.pages;
      const datas = Object.values(data as Result[]).map((result: Result) => ({
        pageid: result.pageid,
        title: result.title,
        extract: result.extract,
        thumbnail: result.thumbnail,
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
