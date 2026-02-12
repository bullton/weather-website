// City Search Component
// Allows users to search for cities with autocomplete functionality

import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Spin } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { searchCities } from '../services/weatherService';
import './CitySearch.css';

const { Search } = Input;

function CitySearch({ onSearch, onClear, loading }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for city suggestions
  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Clear existing debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new debounce timer
    const timer = setTimeout(async () => {
      if (inputValue.length >= 2) {
        await fetchSuggestions(inputValue);
      }
    }, 300);

    setDebounceTimer(timer);
  };

  // Fetch city suggestions
  const fetchSuggestions = async (query) => {
    try {
      setSearching(true);
      const response = await searchCities(query);
      if (response.success) {
        setSuggestions(response.data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setSearching(false);
    }
  };

  // Handle search submission
  const handleSearch = (value) => {
    if (value.trim()) {
      onSearch(value.trim());
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (city) => {
    setValue(`${city.name}, ${city.country}`);
    onSearch(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
  };

  // Handle clear
  const handleClear = () => {
    setValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="city-search-container" ref={containerRef}>
      <Search
        ref={inputRef}
        placeholder="Enter city name (e.g., Beijing, London, New York)"
        value={value}
        onChange={handleInputChange}
        onSearch={handleSearch}
        loading={searching}
        enterButton={
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            size="large"
            loading={loading}
          >
            Search
          </Button>
        }
        size="large"
        disabled={loading}
        allowClear={{
          clearIcon: <CloseOutlined onClick={handleClear} />
        }}
        className="city-search-input"
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(city)}
            >
              <span className="suggestion-city">{city.name}</span>
              <span className="suggestion-country">{city.country}</span>
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator for suggestions */}
      {searching && (
        <div className="suggestions-dropdown">
          <div className="suggestion-item">
            <Spin size="small" />
            <span style={{ marginLeft: 10 }}>Searching...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CitySearch;
