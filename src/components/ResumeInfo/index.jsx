import React, { PropTypes } from 'react';
import styles from './ResumeInfo.css';

const ResumeInfo = ({ info }) => (
  <div className={styles.container}>
    {info}
  </div>
);

ResumeInfo.propTypes = {
  info: PropTypes.string,
};

export default ResumeInfo;
