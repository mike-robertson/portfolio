import React from 'react';
import Text from 'components/Text';
import styles from './HomeScreen.css';

const HomeScreen = () => (
  <div className={styles.container}>
    <Text fontSize="16vw" className={styles.nameText}>Michael Robertson</Text>
    <Text fontSize={24} color={styles.green}>Software/Web Engineer</Text>
  </div>
);

export default HomeScreen;
