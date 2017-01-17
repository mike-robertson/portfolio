import React from 'react';

import Text from 'components/Text';

import styles from './HomeScreen.css';

const HomeScreen = () => (
  <div>
    <div className={styles.container}>
      <Text fontSize="14vw" className={styles.nameText}>Michael Robertson</Text>
      <Text fontSize={24} color={styles.green}>Software Engineer</Text>
    </div>
    <div className={styles.content}>
      {Array.from({ length: 100 }, () => <div>Text</div>)}
    </div>
  </div>
);

export default HomeScreen;
