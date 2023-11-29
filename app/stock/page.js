'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
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

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(stock =>
    stock.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.Symbol.toLowerCase().includes(searchTerm.toLowerCase()));

    const filterOptions = ['Price', 'Positive EPS', 'Market Cap']; // Replace with your actual filter options

  return (
    <div className="container mt-5">
      <h1>Stocks</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search stocks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       <select
          className="form-control"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        >
          <option value="">Filter by...</option>
          {filterOptions.map((option,index) => (
            <option key ={index} value={option}> {option} </option>
          ))}
        </select>
      <div className="list-group">
        {filteredStocks.map((stock, index) => (
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
