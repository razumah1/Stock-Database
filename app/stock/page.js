'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockList = () => {
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 150 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 280 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2700 }
  ]);

  useEffect(() => {
    // Here you would make an API call to fetch stock data
    // and then set it using setStocks
  }, []);

  return (
    <div className="container mt-5">
      <h1>Stocks</h1>
      <div className="list-group">
        {stocks.map(stock => (
          <a key={stock.symbol} href={`/stock/${stock.symbol}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              <h5>{stock.name}</h5>
              <p className="mb-0">{stock.symbol}</p>
            </div>
            <span className="badge bg-primary rounded-pill">${stock.price}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StockList;
