import React from 'react';
import { Link } from 'react-router';
import Title from 'components/Title';
import Text from 'components/Text';
import Button from 'components/Buttons';
import DownloadLinkButton from 'components/Buttons/DownloadLinkButton';

import styles from './Resume.css';

const Resume = ({ children }) => (
  <div>
    <DownloadLinkButton
      url="/assets/Mike_Robertson_Resume.pdf"
      color={styles.blue}
    />
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title fontSize={54}>
          <div>Michael Robertson</div>
        </Title>
        <Text fontSize={24}>Software Engineer</Text>
        <div className={styles.buttonContainer}>
          <Button tag={Link} buttonProps={{ to: '/resume' }}>Info</Button>
          <Button tag={Link} buttonProps={{ to: '/resume/experience' }}>Experience</Button>
          <Button tag={Link} buttonProps={{ to: '/resume/skills' }}>Skills</Button>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  </div>
);

export default Resume;
