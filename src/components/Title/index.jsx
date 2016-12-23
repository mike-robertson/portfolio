import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Title.css';

const Title = ({ children, align = 'start', fontSize }) => (
  <div
    style={{ fontSize }}
    className={classnames(
      styles.container,
      styles[align],
    )}
  >
    {children}
  </div>
);

Title.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(['center', 'start', 'end']),
};

export default Title;
