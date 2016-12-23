import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Icon.css';

const Icon = ({ type, className }) => (
  <i
    className={classnames(styles.icon, 'material-icons', styles[type])}
  />
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Icon;
