import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import RoutingButton from 'components/Button/RoutingButton';
import Text from 'components/Text';
import styles from './NavLink.css';

const NavLink = ({ link, path }) => (
  <RoutingButton
    key={link.name}
    link={link.url}
    path={path}
    regex={/\/([a-zA-Z0-9]*)(?:\/)?/}
    selectedStyle={styles.selected}
    wasSelectedStyle={styles.wasSelected}
  >
    <li className={styles.container}>
      <div className={styles.bar} />
      <Link to={link.url}><Text fontSize={24}>{link.name}</Text></Link>
    </li>
  </RoutingButton>
);

NavLink.propTypes = {
  path: PropTypes.string,
  link: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default NavLink;
