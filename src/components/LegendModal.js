import React from 'react';
import formatcoords from 'formatcoords';

import Title from './Title';
import Wir from './Wir';
import TextWithParagraphs from './TextWithParagraphs';

import { LegendShape, zIndexes, zIndexElements } from '../constants';
import { getGoogleMapsUrl, track } from '../utils';

const LegendModal = ({ legend: { emoji, emojiCode, coordinates, title, text }, onClose }) => (
  <div className="legend__modal" style={{ zIndex: zIndexes[zIndexElements.LEGENDS_MODAL] }}>
    <div className="legend__content">
      <div className="legend__left">
        <Title />
        <img className="legend__emoji" src={`./images/${emojiCode}.png`} alt={title} />
        <Wir />
      </div>
      <div className="legend__right">
        <div className="legend__top">
          <div className="legend__emoji-wrapper">
            <img className="legend__emoji" src={`./images/${emojiCode}.png`} alt={title} />
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
      <button className="legend__close-button" onClick={onClose}>
        <i className="legend__close-icon fa fa-times" />
      </button>
    </div>
  </div>
);

LegendModal.propTypes = {
  legend: LegendShape.isRequired,
};

export default LegendModal;
