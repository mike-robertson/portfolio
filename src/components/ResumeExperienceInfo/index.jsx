import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import styles from './ResumeExperienceInfo.css';

const ResumeExperienceInfo = ({ info }) => (
  <div className={styles.container}>
    <Icon type="label_outline" /><span>{info}</span>
  </div>
);

ResumeExperienceInfo.propTypes = {
  info: PropTypes.string,
};

export default ResumeExperienceInfo;
