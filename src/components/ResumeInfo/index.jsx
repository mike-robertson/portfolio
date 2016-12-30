import React, { PropTypes } from 'react';
import ResumeSection from 'components/ResumeSection';
import styles from './ResumeInfo.css';

const ResumeInfo = ({ location, phone, email, education }) => (
  <div className={styles.container}>
    <div>
      <ResumeSection
        sectionInfo={{
          subject: education.school,
          role: education.degree,
          location: education.location,
          date: education.date,
        }}
      />
    </div>
    <div className={styles.contactInfo}>
      <div>{location.streetAddress}</div>
      <div>{location.cityState}</div>
      <div><b>{phone}</b></div>
      <div><a href={`mailto:${email}`}><b>{email}</b></a></div>
    </div>
  </div>
);

ResumeInfo.propTypes = {
  location: PropTypes.shape({
    streetAddress: PropTypes.string,
    cityState: PropTypes.string,
  }),
  phone: PropTypes.string,
  email: PropTypes.string,
  education: PropTypes.shape({
    school: PropTypes.string,
    degree: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.date,
  }),
};

export default ResumeInfo;
