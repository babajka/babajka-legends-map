import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import keyBy from 'lodash/keyBy';

import Clickable from './Clickable';

import { ACCESS_TOKEN, LIGHT_STYLE, MINSK, BELARUS_BOUNDS } from './constants';
import './styles.css';

const Map = ReactMapboxGl({
  accessToken: ACCESS_TOKEN,
});

// NOTE: When rendering many objects,
// avoid using `Markers` as it will negatively affect performance.
// Use `Layers` and `Features` instead.
// https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#marker

class App extends Component {
  static propTypes = {
    legends: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        text: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    activeLegendId: null,
    legendsById: keyBy(this.props.legends, 'id'),
  };

  render() {
    const { legends } = this.props;
    const { activeLegendId, legendsById } = this.state;
    const activeLegend = legendsById[activeLegendId];
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
            .map(({ id, coordinates, emoji, emojiShort, emojiCode }) => (
              <Marker key={id} coordinates={coordinates}>
                <Clickable className="marker" onClick={() => this.setState({ activeLegendId: id })}>
                  <img alt={emoji} src={`./images/${emojiCode}.png`} />
                </Clickable>
              </Marker>
            ))}
          {activeLegend && (
            <Popup key={activeLegend.id} coordinates={activeLegend.coordinates} offset={50}>
              <div className="popup">
                <div>{activeLegend.title}</div>
              </div>
            </Popup>
          )}
        </Map>
        <div className="legend-text">{activeLegend && activeLegend.text}</div>
      </>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App legends={require('./legends')} />, rootElement);
