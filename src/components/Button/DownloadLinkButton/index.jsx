import React, { PropTypes } from 'react';
import Button from 'components/Button';
import styles from './DownloadLinkButton.css';

const DownloadLinkButton = ({ url, color, borderColor, backgroundColor, children }) => (
  <Button
    tag="a"
    buttonProps={{ href: url, download: true }}
    icon="file_download"
    color={color}
    borderColor={borderColor}
    className={styles.floatButton}
  >
    {children}
  </Button>
);

DownloadLinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  children: PropTypes.node,
};

export default DownloadLinkButton;
