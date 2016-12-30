import React, { Component, PropTypes } from 'react';
import { getDistanceFromBottom } from 'utility';

import SelectExpand from 'components/SelectExpand';
import SelectOptions from 'components/SelectOptions';
import Input from 'components/Input';
import styles from './Select.css';

class Select extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedOption: null,
      foundOptions: [],
      inputValue: '',
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSelectOptionClick = this.handleSelectOptionClick.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
  }

  setSelectedOption(key) {
    const { setSelectedOption } = this.props;
    setSelectedOption(key);
    this.setState({
      selectedOption: key,
      inputValue: key,
      open: false,
      foundOptions: [],
    });
  }

  handleKeyPress(event) {
    const { inputValue, selectedOption } = this.state;
    const { options } = this.props;
    const matchingOption = selectedOption || options.find(option => option.key === inputValue);
    // enter key pressed
    if (event.keyCode === 13 && matchingOption) {
      event.preventDefault();
      this.setSelectedOption(matchingOption.key);
    } else if (event.keyCode !== 13) {
      this.setState({
        selectedOption: null,
      });
    }
  }

  handleOnChange(event) {
    const { value } = event.target;
    const { options } = this.props;
    const foundOptions = value === ''
      ? []
      : options.filter(option => option.value.includes(value));
    this.setState({
      foundOptions,
      inputValue: value,
    });
  }

  handleOnClick(event) {
    const { options } = this.props;
    const { open } = this.state;
    const noRoomBelow = !open && getDistanceFromBottom(event) < (29 * options.length);

    this.setState({
      open: !open,
      noRoomBelow,
    });
  }

  handleSelectOptionClick(key) {
    this.setSelectedOption(key);
  }

  render() {
    const {
      open,
      selectedOption,
      inputValue,
      foundOptions,
      noRoomBelow,
    } = this.state;
    const { options } = this.props;

    return (
      <div className={styles.container}>
        <Input
          type="text"
          onChange={this.handleOnChange}
          value={selectedOption || inputValue}
          onKeyDown={this.handleKeyPress}
          className={styles.input}
        />
        <SelectExpand
          onClick={this.handleOnClick}
          open={open}
        />
        {open && <SelectOptions
          options={options}
          onClick={this.handleSelectOptionClick}
          noRoomBelow={noRoomBelow}
        />}
        {!open && foundOptions && foundOptions.length > 0 && (
          <SelectOptions
            options={foundOptions}
            onClick={this.handleSelectOptionClick}
            noRoomBelow={noRoomBelow}
          />
        )}
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSelectedOption: PropTypes.func,
};

export default Select;
