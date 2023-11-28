'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Replace with the endpoint that returns the list of stocks from your Flask backend
        const response = await fetch('http://localhost:5328/api/stocks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStocks(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Could not fetch stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Stocks</h1>
      <div className="list-group">
        {stocks.map((stock, index) => (
          <a key={index} href={`/stock/${stock.Symbol}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              <h5>{stock.CompanyName}</h5>
              <p className="mb-0">{stock.Symbol}</p>
            </div>
            <span className="badge bg-primary rounded-pill">${parseFloat(stock.Price).toFixed(2)}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StockList;
