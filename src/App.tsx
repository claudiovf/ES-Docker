/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [displayData, setDisplayData] = useState<any>(null);

  const getData = () => {
    
    fetch('http://localhost:9200/inspections/_search')
      .then(res => res.json())
      .then(data => setDisplayData(data.hits.hits))
      .catch(err  => console.log(err.message))
  }

  const dataKeys = displayData ? Object.keys(displayData[0]._source) : null;
  
  console.log('running on docker on prod NGINX for router')
  return (
    <div className="App">
      <h1>Elastic Docker</h1>

        <button onClick={() => getData()}>Get Data</button>
      {
        displayData && dataKeys
        ?<table>
          <tbody>
            <tr>
              {
                dataKeys.map(field =><th key={field}>
                  {
                    field
                      .split("_")
                      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")
                  }
                  </th>)
              }
            </tr>
            {
              displayData.map((item: any) => 
                <tr key={item._id}>
                  {
                    dataKeys.map(field => <td key={field}>{
                      typeof item._source[field] !== "object" ? item._source[field] : "Object"
                    }</td>)
                  }
                </tr>
                )
            }
            
          </tbody>
        </table>
      : null
      }
    </div>
  );
}

export default App;
