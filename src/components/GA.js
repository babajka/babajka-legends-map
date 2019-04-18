import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import clearUtmParams from 'lib/utils/clearUtmParams';

import { pageView } from 'utils';
import { GA_ID } from 'consts';

class GA extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    if (process.env.REACT_APP_WIR_ENV) {
      ReactGA.initialize(GA_ID[process.env.REACT_APP_WIR_ENV], {
        debug: process.env.REACT_APP_WIR_ENV !== 'production',
      });
      pageView({ hitCallback: clearUtmParams });
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default GA;
