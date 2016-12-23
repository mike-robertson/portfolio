import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import Text from 'components/Text';
import styles from './NavLink.css';

const getRootPath = (path) => {
  const [, rootPath] = path.match(/\/([a-zA-Z0-9]*)(?:\/)?/);
  return rootPath;
};

const isSelectedPath = (url, path) => {
  const [, rootPath = ''] = getRootPath(path);
  const [, rootUrl = ''] = getRootPath(url);
  return rootPath === rootUrl.toLowerCase();
};

class NavLink extends Component {
  constructor() {
    super();
    this.wasSelected = false;
  }

  componentWillReceiveProps({ link, path }) {
    if (getRootPath(path) !== getRootPath(this.props.path)
        && isSelectedPath(link.url, this.props.path)) {
      this.wasSelected = true;
    } else {
      this.wasSelected = false;
    }
  }

  render() {
    const {
      link,
      path,
    } = this.props;

    return (
      <li
        key={link.name}
        className={classnames(
          styles.link,
          isSelectedPath(link.url, path) && styles.selected,
          this.wasSelected && styles.wasSelected,
        )}
      >
        <Link to={link.url}><Text fontSize={24}>{link.name}</Text></Link>
      </li>
    );
  }
}

NavLink.propTypes = {
  path: PropTypes.string,
  link: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default NavLink;
