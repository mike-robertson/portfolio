import React from 'react';
import { Link } from 'react-router';
import Title from 'components/Title';
import Text from 'components/Text';
import Button from 'components/Buttons';
import DownloadLinkButton from 'components/Buttons/DownloadLinkButton';

import styles from './Resume.css';

const Resume = ({ children }) => (
  <div>
    <div className={styles.container}>
      <DownloadLinkButton
        url="/assets/Mike_Robertson_Resume.pdf"
        color={styles.blue}
      />
      <div className={styles.titleContainer}>
        <Title fontSize={54}>
          <div>Michael Robertson</div>
        </Title>
        <Text fontSize={24}>Software Engineer</Text>
        <div>
          <Button width={120} tag={Link} buttonProps={{ to: '/resume' }}>Info</Button>
          <Button width={120} tag={Link} buttonProps={{ to: '/resume/experience' }}>Experience</Button>
          <Button width={120} tag={Link} buttonProps={{ to: '/resume/skills' }}>Skills</Button>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  </div>
);

export default Resume;
