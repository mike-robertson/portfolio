import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Input.css';

const Input = ({ onChange, className, ...domProps }) => (
  <input
    className={classnames(styles.input, className)}
    onChange={onChange}
    {...domProps}
  />
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Input;
