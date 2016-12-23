import React, { PropTypes } from 'react';

import NavLink from 'components/NavLink';
import styles from './NavBar.css';

const NavBar = ({ links, path }) => (
  <div className={styles.container}>
    <ul className={styles.links}>
      {links.map(link => (
        <NavLink
          link={link}
          key={link.name}
          path={path}
        />
      ))}
    </ul>
  </div>
);

NavBar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  path: PropTypes.string,
};

export default NavBar;
