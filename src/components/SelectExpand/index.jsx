import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import styles from './SelectExpand.css';

const SelectExpand = ({ open, onClick }) => (
  <div
    className={styles.container}
    onClick={onClick}
  >
    <Icon
      className={open ? styles.open : styles.closed}
      type="keyboard_arrow_down"
    />
  </div>
);

SelectExpand.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SelectExpand;
