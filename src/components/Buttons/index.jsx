import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import classnames from 'classnames';

import styles from './Button.css';

const Button = ({ tag, buttonProps, icon, color, borderColor, className, width, children }) => {
  const Tag = tag || 'button'; // Don't want nulls
  return (
    <Tag
      {...buttonProps}
      className={classnames(
        styles.container,
        className,
      )}
      style={{ color, borderColor, width }}
    >
      <div
        className={classnames(
          styles.inner,
          children && styles.children,
        )}
      >
        {children}
        {icon && <Icon type={icon} />}
      </div>
    </Tag>
  );
};

Button.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  buttonProps: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.node,
};

export default Button;
