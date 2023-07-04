import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, handleFilterChange }) => {
  const handleChange = (event) => {
    handleFilterChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="findInput">Find contacts by name or number</label>
      <input
        type="text"
        id="findInput"
        placeholder="Search contacts"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
