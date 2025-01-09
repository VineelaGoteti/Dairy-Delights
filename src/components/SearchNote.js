import { useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchNote({ onSearchNote, searchText, onClearSearchNote }) {
  
  return (
    <div className="search-box">
      <IconButton  color="inherit">
        <SearchIcon sx={{ color: 'white' }} />
      </IconButton>

      <input
        id="input-box"
        type="text"
        value={searchText}
        placeholder="Search for Product"
        onChange={onSearchNote}
      />

      {searchText !== "" && (
        <button id="btn" type="reset" onClick={onClearSearchNote}>
          X
        </button>
      )}
    </div>
  );
}
