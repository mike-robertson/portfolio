import React from 'react';
import ResumeSection from 'components/ResumeSection';
import { resumeExperience } from 'components/Resume/sectionInfo';

const ResumeExperience = () => (
  <div>
    {resumeExperience.map(section => <ResumeSection key={`${section.subject}_${section.role}`} sectionInfo={section} />)}
  </div>
);

export default ResumeExperience;
