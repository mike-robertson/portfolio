import React, { PropTypes } from 'react';

const Text = ({ fontWeight, color, fontStyle, textTransform, fontSize, className, children, Tag = 'span' }) => (
  <Tag
    className={className}
    style={{
      fontWeight,
      color,
      fontStyle,
      fontSize,
      textTransform,
    }}
  >
    {children}
  </Tag>
);

Text.propTypes = {
  fontWeight: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  fontStyle: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textTransform: PropTypes.string,
  Tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node.isRequired,
};

export default Text;
