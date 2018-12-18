import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import ReactGA from 'react-ga';
import keyBy from 'lodash/keyBy';

import Clickable from './common/Clickable';
import LegendModal from './LegendModal';

import { track } from './utils';

import {
  MAPBOX_ACCESS_TOKEN,
  GA_ID,
  LIGHT_STYLE,
  MINSK,
  BELARUS_BOUNDS,
  LegendShape,
} from './constants';
import './styles.scss';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN,
  minZoom: 4,
  maxZoom: 9,
});

// NOTE: When rendering many objects,
// avoid using `Markers` as it will negatively affect performance.
// Use `Layers` and `Features` instead.
// https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#marker

class App extends Component {
  static propTypes = {
    legends: PropTypes.arrayOf(LegendShape).isRequired,
  };

  constructor(props) {
    super(props);
    this.legendsById = keyBy(this.props.legends, 'id');
    this.state = { activeLegendId: null };
  }

  componentDidMount() {
    if (process.env.REACT_APP_WIR_ENV) {
      ReactGA.initialize(GA_ID[process.env.REACT_APP_WIR_ENV], {
        debug: false,
      });
      ReactGA.pageview(document.location.pathname);
    }
  }

  setActiveLegendId = activeLegendId => this.setState({ activeLegendId });

  render() {
    const { legends } = this.props;
    const { activeLegendId } = this.state;
    const activeLegend = this.legendsById[activeLegendId];
    return (
      <>
        <Map
          style={LIGHT_STYLE}
          containerStyle={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
          }}
          // TODO: fix calling `fitBounds` on window resizing
          fitBounds={BELARUS_BOUNDS}
          fitBoundsOptions={{
            padding: 25,
          }}
          center={MINSK}
        >
          {legends
            .filter(({ emoji }) => emoji)
            .map(({ id, title, coordinates, emoji, emojiCode }) => (
              <Marker key={id} coordinates={coordinates}>
                <Clickable
                  className="legends__marker"
                  onClick={() => {
                    track({ action: 'emoji-clicked', label: `${emoji} ${title}` });
                    this.setState({ activeLegendId: id });
                  }}
                >
                  <img className="legends__emoji" alt={emoji} src={`./images/${emojiCode}.png`} />
                </Clickable>
              </Marker>
            ))}
        </Map>
        {activeLegend && (
          <LegendModal legend={activeLegend} onClose={() => this.setActiveLegendId(null)} />
        )}
      </>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App legends={require('./legends')} />, rootElement);
