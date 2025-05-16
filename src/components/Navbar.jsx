import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);  // Pass the search term to the parent component
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="Logo" className="navbar-logo" />

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Admin Login</Link>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button onClick={handleSearchChange} className="search-btn">Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
