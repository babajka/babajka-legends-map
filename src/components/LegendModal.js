import React from 'react';
import PropTypes from 'prop-types';
import formatcoords from 'formatcoords';

import OnEscape from './common/OnEscape';
import Clickable from './common/Clickable';
import TextWithParagraphs from './common/TextWithParagraphs';
import Title from './Title';
import Wir from './Wir';
import CrossSvgIcon from './CrossSvgIcon';

import { LegendShape, zIndexes, zIndexElements } from '../constants';
import { getGoogleMapsUrl, track } from '../utils';

const LegendEmoji = ({ legend: { emojiCode, emoji } }) => (
  <img className="legend__emoji" src={`./images/${emojiCode}-144.png`} alt={emoji} />
);

const LegendModal = ({ legend: { emoji, coordinates, title, text }, legend, onClose }) => (
  <div className="legend__modal" style={{ zIndex: zIndexes[zIndexElements.LEGENDS_MODAL] }}>
    <div className="legend__content">
      <Clickable className="legend__left" onClick={onClose}>
        <Title />
        <LegendEmoji legend={legend} />
        <Wir />
      </Clickable>
      <div className="legend__right">
        <div className="legend__top">
          <div className="legend__emoji-wrapper">
            <LegendEmoji legend={legend} />
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
          <TextWithParagraphs text={text} />
        </div>
      </div>
      <button
        type="button"
        className="legend__close-button"
        onClick={onClose}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus="autofocus"
      >
        <CrossSvgIcon className="legend__close-icon" />
      </button>
      <OnEscape action={onClose} />
    </div>
  </div>
);

LegendModal.propTypes = {
  legend: LegendShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LegendModal;
