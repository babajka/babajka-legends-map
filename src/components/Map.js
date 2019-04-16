import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl';

import Clickable from 'lib/components/Clickable';
import Title from 'components/Title';
import Wir from 'components/Wir';
import LegendModal from 'components/LegendModal';

import { track, isDesktopDevice } from 'utils';

import {
  MAPBOX_ACCESS_TOKEN,
  LIGHT_STYLE,
  MINSK,
  BELARUS_BOUNDS,
  EMOJI_SCALE_RATE,
  LegendShape,
  zIndexes,
  zIndexElements,
} from '../constants';

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
  };

  state = {
    activeLegend: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeMap);
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
    const { activeLegend } = this.state;
    return {
      rightShift: isDesktopDevice() && !activeLegend,
      topShift: !isDesktopDevice(),
    };
  };

  resizeMap = () => {
    this.map.resize();
    this.map.fitBounds(BELARUS_BOUNDS, getFitBoundsOptions(this.calculateShifts()));
  };

  setActiveLegend = activeLegend => this.setState({ activeLegend }, this.resizeMap);

  render() {
    const { legends } = this.props;
    const { activeLegend, zoom } = this.state;
    return (
      <>
        <Title />
        <main>
          <Mapbox
            style={LIGHT_STYLE}
            containerStyle={{
              position: 'absolute',
              top: activeLegend ? 150 : 0,
              bottom: 0,
              width: activeLegend ? '50%' : '100%',
              zIndex: zIndexes[zIndexElements.MAP],
            }}
            fitBounds={BELARUS_BOUNDS}
            fitBoundsOptions={getFitBoundsOptions(this.calculateShifts())}
            center={MINSK}
            onZoom={this.handleZoom}
            // HACK: same `map` object
            onSourceDataLoading={map => {
              if (!this.map) {
                this.map = map;
              }
            }}
          >
            {!activeLegend && <ZoomControl style={{ zIndex: zIndexes[zIndexElements.CONTROLS] }} />}
            {legends
              .filter(({ id }) => !activeLegend || id === activeLegend.id)
              .map(legend => {
                const { id, title, coordinates, emoji, emojiCode } = legend;
                return (
                  <Marker
                    key={id}
                    coordinates={coordinates}
                    style={{ zIndex: zIndexes[zIndexElements.MARKER] }}
                  >
                    <Clickable
                      className="legends__marker"
                      onClick={({ currentTarget }) => {
                        // HACK: clear outline
                        currentTarget.blur();
                        track({ action: 'emoji-clicked', label: `${emoji} ${title}` });
                        this.setActiveLegend(legend);
                      }}
                    >
                      <img
                        alt={emoji}
                        src={`./images/${emojiCode}-72.png`}
                        width={zoom * EMOJI_SCALE_RATE}
                      />
                    </Clickable>
                  </Marker>
                );
              })}
          </Mapbox>
        </main>
        <Wir />
        {activeLegend && (
          <LegendModal legend={activeLegend} onClose={() => this.setActiveLegend(null)} />
        )}
      </>
    );
  }
}

export default Map;
