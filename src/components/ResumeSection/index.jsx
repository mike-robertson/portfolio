import React, { PropTypes } from 'react';

import Text from 'components/Text';
import ResumeExperienceInfo from 'components/ResumeExperienceInfo';
import styles from './ResumeSection.css';

const ResumeSection = ({ sectionInfo: {
  subject,
  role,
  date,
  location,
  url,
  github,
  info,
} }) => (
  <div className={styles.container}>
    <Text tag="div" fontSize={24}><b>{subject}&nbsp;</b><div className={styles.role}>{role}</div></Text>
    {location && <div><Text fontSize={20}>{location}</Text></div>}
    {url && <div>
      <a className={styles.link} target="_blank" rel="noopener noreferrer" href={url}>
        <i>{url}</i>
      </a>
    </div>}
    {github && <div>
      <a className={styles.link} target="_blank" rel="noopener noreferrer" href={github}>
        <i>{github}</i>
      </a>
    </div>}
    <Text className={styles.date} textTransform="uppercase">{date}</Text>
    <div className={styles.resumeInfoContainer}>
      {Array.isArray(info) && info.map(info => <ResumeExperienceInfo key={info} info={info} />)}
    </div>
  </div>
);

ResumeSection.propTypes = {
  sectionInfo: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    role: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    github: PropTypes.string,
    url: PropTypes.string,
    info: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ResumeSection;
