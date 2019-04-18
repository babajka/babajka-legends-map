import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import formatcoords from 'formatcoords';
import { Link, navigate } from '@reach/router';

import TextWithSeparator from 'lib/components/TextWithSeparator';
import OnEscape from 'lib/components/OnEscape';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import CrossSvgIcon from 'components/CrossSvgIcon';

import { getGoogleMapsUrl, track, pageView, getImageUrl } from 'utils';
import { LegendShape, zIndexes, zIndexElements } from 'consts';

const LegendEmoji = ({ legend: { id, emoji }, emojis }) => (
  <img className="legend__emoji" src={getImageUrl(emojis[id])} alt={emoji} />
);

const LegendModal = ({ legendId, legendsById, emojis }) => {
  const legend = legendsById[legendId];
  const { emoji, coordinates, title, text } = legend;
  useEffect(() => {
    track({ action: 'emoji-clicked', label: `${emoji} ${title}` });
    pageView();
  }, []);
  return (
    <div className="legend__modal" style={{ zIndex: zIndexes[zIndexElements.LEGENDS_MODAL] }}>
      <div className="legend__content">
        <Link className="legend__left" to="/legends">
          <Header />
          <LegendEmoji legend={legend} emojis={emojis} />
        </Link>
        <Footer />
        <div className="legend__right">
          <div className="legend__top">
            <div className="legend__emoji-wrapper">
              <LegendEmoji legend={legend} emojis={emojis} />
            </div>
            <a
              href={getGoogleMapsUrl(coordinates)}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => track({ action: 'google-map-opened', label: `${emoji} ${title}` })}
            >
              {formatcoords(coordinates, true).format('DD MM X', {
                latLonSeparator: ', ',
                decimalPlaces: 2,
              })}
            </a>
            <div className="legend__title">{title}</div>
          </div>
          <div className="legend__text">
            <TextWithSeparator
              text={text}
              symbol={`\n`}
              separator={
                <>
                  <br />
                  <br />
                </>
              }
            />
          </div>
        </div>
        <Link to="/legends" type="button" className="legend__close-button">
          <CrossSvgIcon className="legend__close-icon" />
        </Link>
        <OnEscape action={() => navigate('/legends')} />
      </div>
    </div>
  );
};

LegendModal.propTypes = {
  legendId: PropTypes.string,
  legendsById: PropTypes.objectOf(LegendShape).isRequired,
  emojis: PropTypes.objectOf(PropTypes.string).isRequired,
};

LegendModal.defaultProps = {
  legendId: null,
};

export default LegendModal;
