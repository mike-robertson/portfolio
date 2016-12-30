import React from 'react';
import { Link } from 'react-router';
import Title from 'components/Title';
import Text from 'components/Text';
import Button from 'components/Button';
import RoutingButton from 'components/Button/RoutingButton';
import DownloadLinkButton from 'components/Button/DownloadLinkButton';

import styles from './Resume.css';

const resumeRoutes = [
  {
    url: '/resume',
    name: 'Info',
  }, {
    url: '/resume/experience',
    name: 'Experience',
  }, {
    url: '/resume/skills',
    name: 'Skills',
  },
];

const Resume = ({ location, children }) => (
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
          {resumeRoutes.map(route => (
            <RoutingButton
              key={route.url}
              link={route.url}
              path={location.pathname}
              selectedStyle={styles.selected}
              wasSelectedStyle={styles.wasSelected}
              className={styles.linkButton}
            >
              <Button
                tag={Link}
                buttonProps={{ to: route.url }}
              >
                {route.name}
              </Button>
            </RoutingButton>
          ))}
        </div>
      </div>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  </div>
);

export default Resume;
