import React from 'react';
import Header from 'components/Header';
import styles from './App.css';

const App = ({ children, location }) => (
  <div className={styles.container}>
    <Header path={location.pathname} />
    <div className={styles.body}>
      {children}
    </div>
    <footer />
  </div>
);

const { node } = React.PropTypes;

App.propTypes = {
  children: node,
};

export default App;
