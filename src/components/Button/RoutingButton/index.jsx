import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import styles from './RoutingButton.css';

const getRootPath = (path, regex) => {
  const [, rootPath] = path.match(regex);
  return rootPath;
};

const isSelectedPath = (url, path, regex) => {
  const rootPath = regex
    ? getRootPath(path, regex)
    : path;
  const rootUrl = regex
    ? getRootPath(url, regex)
    : url;
  return rootPath === rootUrl.toLowerCase();
};

class RoutingButton extends Component {
  constructor() {
    super();
    this.wasSelected = false;
  }

  componentWillReceiveProps({ link, path, regex }) {
    if (getRootPath(path, regex) !== getRootPath(this.props.path, this.props.regex)
        && isSelectedPath(link, this.props.path)) {
      this.wasSelected = true;
    } else {
      this.wasSelected = false;
    }
  }

  render() {
    const {
      link,
      path,
      children,
      regex,
      selectedStyle = styles.selected,
      wasSelectedStyle = styles.wasSelected,
      className,
    } = this.props;

    return React.cloneElement(children, {
      className: classnames(
        className,
        styles.link,
        isSelectedPath(link, path, regex) && selectedStyle,
        this.wasSelected && wasSelectedStyle,
      ),
    });
  }
}

RoutingButton.propTypes = {
  path: PropTypes.string,
  link: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  selectedStyle: PropTypes.string,
  // regex: PropTypes.regexp,
  wasSelectedStyle: PropTypes.string,
};

export default RoutingButton;
