import React, { PropTypes } from 'react';
import { resumeSkills } from 'components/Resume/sectionInfo';
import styles from './ResumeSkills.css';

const ResumeSkill = ({ skill: {
  title,
  list,
} }) => (
  <div>
    <b>{title}</b>
    &nbsp;-&nbsp;
    <div className={styles.listItemContainer}>
      {list.map((item, index) => <span key={item}>{`${item}${index < list.length - 1 ? ', ' : ''}`}</span>)}
    </div>
  </div>
);

const ResumeSkills = () => (
  <div className={styles.container}>
    {resumeSkills.map(skill => <ResumeSkill key={skill.title} skill={skill} />)}
  </div>
);

ResumeSkills.propTypes = {

};

export default ResumeSkills;
