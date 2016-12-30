import React, { PropTypes } from 'react';
import styles from './SelectOption.css';

const SelectOption = ({ option, onClick }) => (
  <div
    className={styles.container}
    onClick={() => onClick(option.key)}
  >
    {option.value}
  </div>
);

SelectOption.propTypes = {
  option: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default SelectOption;
