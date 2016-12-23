import React, { PropTypes } from 'react';
import NavBar from 'components/NavBar';
import styles from './Header.css';

const links = [
  {
    name: 'Home',
    url: '/',
  }, {
    name: 'Resume',
    url: '/resume',
  },
];

const Header = ({ path }) => (
  <div className={styles.container}>
    <NavBar links={links} path={path} />
  </div>
);

Header.propTypes = {
  path: PropTypes.string,
};

export default Header;
