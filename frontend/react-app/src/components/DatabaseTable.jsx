import React, { useState, useEffect } from 'react';
import './DatabaseTable.css';

const fetchDataFromQuery = async (query) => {
    try {
        const response = await fetch('https://backend-heli.onrender.com/query', {
          method: 'POST',
          body: JSON.stringify({ query }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

const DatabaseTable = ({ query }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchDataFromQuery(query);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table className='data-table'>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={`${index}-${column}`}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DatabaseTable;
