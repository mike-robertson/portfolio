import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { blendColor, objectifyRGB, stringifyRGB } from 'utility';
import { selectors } from 'reducers/navbar';
import NavLink from 'components/NavLink';
import styles from './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: props.startBackgroundColor,
      color: props.startColor,
    };

    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillReceiveProps(nextProps) {
    const {
      startColor,
      startBackgroundColor,
    } = this.props;
    if (nextProps.startColor !== startColor || nextProps.startBackgroundColor !== startBackgroundColor) {
      this.setState({
        color: nextProps.startColor,
        backgroundColor: nextProps.startBackgroundColor,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    const {
      startChangeHeight,
      endChangeHeight,
      startColor,
      startBackgroundColor,
    } = this.props;
    const { pageYOffset } = window;
    if (pageYOffset < startChangeHeight) {
      this.setState({
        color: startColor,
        backgroundColor: startBackgroundColor,
      });
    } else if (pageYOffset <= endChangeHeight) {
      const percent = 1 - ((endChangeHeight - pageYOffset) / (endChangeHeight - startChangeHeight));
      const blendedColor = blendColor(objectifyRGB(startColor), objectifyRGB(styles.black9), percent);
      const blendedBackgroundColor = blendColor(objectifyRGB(startBackgroundColor), objectifyRGB(styles.textColorPrimaryAlpha), percent);
      this.setState({
        color: stringifyRGB(blendedColor),
        backgroundColor: stringifyRGB(blendedBackgroundColor),
      });
    } else {
      this.setState({
        color: styles.black9,
        backgroundColor: styles.textColorPrimaryAlpha,
      });
    }
  }

  render() {
    const {
      links,
      path,
    } = this.props;
    const { color, backgroundColor } = this.state;
    return (
      <div
        className={styles.container}
        style={{ backgroundColor }}
      >
        <ul className={styles.links}>
          {links.map(link => (
            <NavLink
              link={link}
              key={link.name}
              path={path}
              style={{ color }}
            />
          ))}
        </ul>
      </div>
    );
  }
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  path: PropTypes.string,
  startColor: PropTypes.string,
  startBackgroundColor: PropTypes.string,
  startChangeHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endChangeHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapStateToProps = state => ({
  startColor: selectors.startColor(state),
  startBackgroundColor: selectors.startBackgroundColor(state),
  startChangeHeight: selectors.startChangeHeight(state),
  endChangeHeight: selectors.endChangeHeight(state),
});

export default connect(mapStateToProps)(NavBar);
