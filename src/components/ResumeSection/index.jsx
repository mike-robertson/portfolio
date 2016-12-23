import React, { PropTypes } from 'react';

import Text from 'components/Text';
import Title from 'components/Title';
import ResumeExperienceInfo from 'components/ResumeExperienceInfo';
import styles from './ResumeSection.css';

const ResumeSection = ({ sectionInfo: {
  subject,
  role,
  date,
  location,
  info,
} }) => (
  <div className={styles.container}>
    <Text tag="div" fontSize={24}><b>{subject}&nbsp;</b><div className={styles.role}>{role}</div></Text>

    <div><i>{location}</i></div>
    <Text className={styles.date} textTransform="uppercase">{date}</Text>
    <div className={styles.resumeInfoContainer}>
      {info.map(info => <ResumeExperienceInfo key={info} info={info} />)}
    </div>
  </div>
);

ResumeSection.propTypes = {
  sectionInfo: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    role: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string.isRequired,
    info: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ResumeSection;
