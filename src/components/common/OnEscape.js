import { Component } from 'react';
import PropTypes from 'prop-types';

export default class OnEscape extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }) => {
    const { action } = this.props;
    if (key === 'Escape') {
      action();
    }
  };

  render() {
    return null;
  }
}
