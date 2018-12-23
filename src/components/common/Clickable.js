import React from 'react';
import PropTypes from 'prop-types';

const Clickable = ({ onClick, children, ...props }) => (
  <div
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
  </div>
);

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Clickable;
