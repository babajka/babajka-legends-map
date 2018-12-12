import React from 'react';
import PropTypes from 'prop-types';

const Clickable = ({ onClick, children, ...props }) => (
  <span
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={event => {
      if (event.key === 'Enter') {
        onClick(event);
      }
    }}
    {...props}
  >
    {children}
  </span>
);

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Clickable;
