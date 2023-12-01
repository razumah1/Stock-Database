'use client';


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const[selectedFilter, setSelectedFilter] = useState(null);
  const [filteredStocks, setFilteredStocks] = useState([]);


  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5328/api/stocks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Could not fetch stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  const filteredStocksbySearch = stocks.filter((stock) =>
    stock.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.Symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((stock) => {
    const stockPrice = parseFloat(stock.Price);
    return stockPrice >= priceRange[0] && stockPrice <= priceRange[1];
  });

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5328/api/stockMoreInfo');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilterTerm(data);
      } catch (error) {
        console.error("Could not fetch stock data:", error);
      }
    };

    fetchBasicInfo();
  }, []);

  useEffect(() => {
    if (selectedFilter === 'EPS') {
      const filteredStocksByEPS = filterTerm.filter((filter) => {
        const stockEPS = parseFloat(filter.EPS);
        return stockEPS >= 0;
      });
      setFilteredStocks(filteredStocksByEPS);
    } else if (selectedFilter === 'MarketCap') {
      const sortedStocksByMarketCap = [...filterTerm].sort((a, b) => {
        const stockMarketCapA = parseFloat(a.MarketCap);
        const stockMarketCapB = parseFloat(b.MarketCap);
        return stockMarketCapA - stockMarketCapB;
      });
      setFilteredStocks(sortedStocksByMarketCap);
    }
    else {
      setFilteredStocks(stocks);
    }
  },[selectedFilter,stocks,filterTerm]);

  const addToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeFromWatchlist = (symbol) => {
    const updatedWatchlist = watchlist.filter((stockSymbol) => stockSymbol !== symbol);
    setWatchlist(updatedWatchlist);
  };
  return (
    <div className="dark:bg-blue-500">
      <nav class="navbar navbar-expand-md navbar-dark bg-blue-500 justify-content-center">
	        <a class="navbar-brand" href="/">StockHub</a>
	      	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
	        	<span class="navbar-toggler-icon"></span>
	      	</button>
	    </nav>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search stocks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>Price Range:</label>
      <input
        type="range"
        className="form-range mb-3"
        min={0}
        max={1000}
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
      />
        <label>Filter By: </label>
        <select onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value = "">Select an option</option>
          <option value="EPS">EPS</option>
          <option value="MarketCap">Market Cap</option>
        </select>
      <div className="list-group">

        {filteredStocksbySearch.map((stock, index) => (
          <div
            key={index}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{stock.CompanyName}</h5>
              <p className="mb-0">{stock.Symbol}</p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <span className="badge bg-primary rounded-pill mb-2">
                ${parseFloat(stock.Price).toFixed(2)}
              </span>
              {watchlist.includes(stock.Symbol) ? (
                <button
                  onClick={() => removeFromWatchlist(stock.Symbol)}
                  className="btn btn-danger"
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  onClick={() => addToWatchlist(stock.Symbol)}
                  className="btn btn-success"
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;
