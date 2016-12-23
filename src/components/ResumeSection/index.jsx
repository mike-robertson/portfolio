import React, { PropTypes } from 'react';

import Text from 'components/Text';
import Title from 'components/Title';
import ResumeInfo from 'components/ResumeInfo';
import styles from './ResumeSection.css';

const ResumeSection = ({ sectionInfo: {
  subject,
  role,
  date,
  location,
  info,
} }) => (
  <div className={styles.container}>
    <Title>
      <Text fontWeight="bold">
        {subject},&nbsp;
      </Text>
      <span>{role} -&nbsp;</span><Text fontStyle="italic">{location}</Text>
    </Title>
    <Text className={styles.date} textTransform="uppercase">{date}</Text>
    <div className={styles.resumeInfoContainer}>
      {info.map(info => <ResumeInfo key={info} info={info} />)}
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
