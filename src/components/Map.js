import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Match } from '@reach/router';
import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl';

import { isDesktopDevice } from 'utils';

import {
  MAPBOX_ACCESS_TOKEN,
  LIGHT_STYLE,
  MINSK,
  BELARUS_BOUNDS,
  EMOJI_SCALE_RATE,
  LegendShape,
  zIndexes,
  zIndexElements,
} from 'consts';

const Mapbox = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN,
  logoPosition: 'bottom-right',
  minZoom: 4,
  maxZoom: 6.5,
});

// NOTE: When rendering many objects,
// avoid using `Markers` as it will negatively affect performance.
// Use `Layers` and `Features` instead.
// https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#marker

const getFitBoundsOptions = ({ rightShift, topShift }) => ({
  padding: {
    left: rightShift ? 250 : 25,
    top: topShift ? 100 : 25,
    bottom: 25,
    right: 25,
  },
});

class Map extends Component {
  static propTypes = {
    legends: PropTypes.arrayOf(LegendShape).isRequired,
    children: PropTypes.node.isRequired,
    match: PropTypes.shape({
      legendId: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    match: null,
  };

  state = {
    zoom: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeMap);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match !== match) {
      this.resizeMap();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMap);
  }

  handleZoom = map => {
    const { zoom } = this.state;
    const nextZoom = Math.round(map.getZoom());
    if (nextZoom !== zoom) {
      this.setState({ zoom: nextZoom });
    }
  };

  calculateShifts = () => {
    const { match } = this.props;
    return {
      rightShift: isDesktopDevice() && !match,
      topShift: !isDesktopDevice(),
    };
  };

  resizeMap = () => {
    setTimeout(() => {
      this.map.resize();
      this.map.fitBounds(BELARUS_BOUNDS, getFitBoundsOptions(this.calculateShifts()));
    }, 10);
  };

  render() {
    const { legends, children, match } = this.props;
    const { zoom } = this.state;
    return (
      <>
        <Mapbox
          style={LIGHT_STYLE}
          containerStyle={{
            position: 'absolute',
            top: match ? 150 : 0,
            bottom: 0,
            width: match ? '50%' : '100%',
            zIndex: zIndexes[zIndexElements.MAP],
          }}
          fitBounds={BELARUS_BOUNDS}
          fitBoundsOptions={getFitBoundsOptions(this.calculateShifts())}
          center={MINSK}
          onZoom={this.handleZoom}
          // HACK: save `map` object
          onSourceDataLoading={map => {
            if (!this.map) {
              this.map = map;
            }
          }}
          movingMethod="easeTo"
        >
          {!match && <ZoomControl style={{ zIndex: zIndexes[zIndexElements.CONTROLS] }} />}
          {legends
            .filter(({ id }) => !match || id === match.legendId)
            .map(legend => {
              const { id, coordinates, emoji, emojiCode } = legend;
              return (
                <Marker
                  key={id}
                  coordinates={coordinates}
                  style={{ zIndex: zIndexes[zIndexElements.MARKER] }}
                >
                  <Link className="legends__marker" to={`/legends/${id}`}>
                    <img
                      alt={emoji}
                      src={`/images/${emojiCode}-72.png`}
                      width={zoom * EMOJI_SCALE_RATE}
                    />
                  </Link>
                </Marker>
              );
            })}
        </Mapbox>
        {children}
      </>
    );
  }
}

export default props => (
  <Match path="/legends/:legendId">{({ match }) => <Map {...props} match={match} />}</Match>
);
