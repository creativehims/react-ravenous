import React, { useEffect, useState } from "react";
import "./SearchBar.css";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
};

const SearchBar = (props) => {
  const { searchYelp } = props;
  const [searchQuery, setSearchQuery] = useState({
    term: "",
    location: "",
    sortBy: "best_match",
  });

  useEffect(() => {
    searchYelp(searchQuery.term, searchQuery.location, searchQuery.sortBy);
  }, [searchQuery]);

  const getSortByClass = (sortByOption) => {
    return sortByOption === searchQuery.sortBy ? "active" : "";
  };

  const handleSortByChange = (sortByOption) => {
    setSearchQuery((prev) => ({ ...prev, sortBy: sortByOption }));
  };

  const handleTermChange = (event) => {
    setSearchQuery((prev) => ({ ...prev, term: event.target.value }));
  };

  const handleLocationChange = (event) => {
    setSearchQuery((prev) => ({ ...prev, location: event.target.value }));
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   searchYelp(searchQuery.term, searchQuery.location, searchQuery.sortBy);
  // };

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={getSortByClass(sortByOptionValue)}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" onChange={handleTermChange} />
        <input placeholder="Where?" onChange={handleLocationChange} />
      </div>
      {/* <div className="SearchBar-submit">
        <a onClick={handleSearch}>Let's Go</a>
      </div> */}
    </div>
  );
};

export default SearchBar;
