import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SelectOption from 'components/SelectOption';
import styles from './SelectOptions.css';

const SelectOptions = ({ options, onClick, noRoomBelow }) => {
  const optionsList = noRoomBelow
    ? options.reverse()
    : options;
  return (
    <div className={classnames(styles.container, noRoomBelow && styles.noRoomBelow)}>
      {optionsList.map(option => <SelectOption
        key={option.key}
        option={option}
        onClick={onClick}
      />)}
    </div>
  );
};

SelectOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  noRoomBelow: PropTypes.bool,
};

export default SelectOptions;
