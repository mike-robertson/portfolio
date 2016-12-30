import React from 'react';
import ResumeInfo from 'components/ResumeInfo';
import { resumeInfo } from 'components/Resume/sectionInfo';
import styles from './ResumeOverview.css';

const ResumeOverview = () => (
  <div className={styles.container}>
    <ResumeInfo {...resumeInfo} />
  </div>
);

export default ResumeOverview;
