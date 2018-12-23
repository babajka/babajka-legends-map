import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StopClickPropagation extends Component {
  static propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    tag: 'div',
    className: '',
  };

  handleStopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { tag, className, children } = this.props;

    return React.createElement(
      tag,
      {
        className,
        onClick: this.handleStopPropagation,
      },
      children
    );
  }
}

export default StopClickPropagation;
