import React, { useEffect, useState } from "react";
import "./App.css"; 

function App() {
  const [datas, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('http://localhost:8000/users');
      const res = await data.json();
      setData(res.data["0"]);
    }

    fetchData();
  }, []);
  const generateImageUrl = (value) => {
    return `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${value}_0.jpg`;
  };
  const renderData = (obj, indent = 0) => {
    return (
      <div className="box" style={{ marginLeft: `${indent * 20}px` }}>
        {Object.keys(obj).map((key) => (
          <div key={key}>
            <strong>{key}</strong>
            {key === 'i' ? (
              <>
                : <img src={generateImageUrl(obj[key])} alt="Student" style={{ maxWidth: "100%", maxHeight: "100px", marginTop: "10px" }} />
              </>
            ) : (
              `: ${JSON.stringify(obj[key])}`
            )}
            {typeof obj[key] === 'object' ? renderData(obj[key], indent + 1) : null}
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="app-container">
      <h1>Student Data</h1>
      <div className="data-container">{datas && renderData(datas)}</div>
    </div>
  );
}

export default App;
