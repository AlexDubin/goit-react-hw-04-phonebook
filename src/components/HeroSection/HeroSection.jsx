import React from 'react';
import PropTypes from 'prop-types';
import css from './HeroSection.module.css';

const HeroSection = ({ herotitle, children }) => {
  return (
    <div className={css.section}>
      <h1 className={css.title}>{herotitle}</h1>
      {children}
    </div>
  );
};

HeroSection.propTypes = {
  herotitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HeroSection;
