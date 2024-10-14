import React, { useEffect, useState } from "react";

import "./MainPage.css";
const MainPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPhotos = async () => {
    try {
      setLoading(true);
      const key = import.meta.env.VITE_PIXABAY_API_KEY;
      console.log(key, query);
      const api_url = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
        query
      )}&image_type=photo`;
      console.log("14", api_url);
      const response = await fetch(api_url, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setData(data.hits);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      getPhotos();
    }
  };
  return (
    <>
      <input
        type="text"
        className="input-search"
        placeholder="Search for Free Photos"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={onKeyDownHandler}
      />
      {loading && <h1> Fetching Pics...</h1>}
      <div className="container">
        {(data.length > 0 &&
          data.map((item) => {
            return (
              <div className="box" key={item.id}>
                <img
                  src={item.largeImageURL}
                  // style={{ width: "600px", height: "450px" }}
                  alt={item.id}
                />
              </div>
            );
          })) || (
          <>
            <div className="not-found">
              <img
                className="img-not-found"
                src="https://cdn.dribbble.com/userupload/2905364/file/original-c1597c0c2a6e0456d362549e47988f1b.png?resize=400x0"
                alt="No Image found"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
