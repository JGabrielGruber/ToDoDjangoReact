import React from 'react';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchComponentProps = {
  value: string,
  onChange: CallableFunction,
  onClick: CallableFunction,
};

function SearchComponent(props: SearchComponentProps) {
  const { value, onChange, onClick } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      onClick();
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input
        id="search"
        fullWidth
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              onClick={handleClick}
              title="Find"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )}
      />
    </FormControl>
  );
}

export default SearchComponent;
