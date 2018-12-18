import React from 'react';
import formatcoords from 'formatcoords';

import TextWithParagraphs from './common/TextWithParagraphs';

import { LegendShape } from './constants';
import { getGoogleMapsUrl, track } from './utils';

const LegendModal = ({ legend: { emoji, emojiCode, coordinates, title, text }, onClose }) => (
  <div className="legend__modal">
    <div className="legend__content">
      <div className="legend__top">
        <img className="legend__emoji" src={`./images/${emojiCode}.png`} alt={title} />
        <div className="legend__coords">
          <a
            className="legend__coords_link"
            href={getGoogleMapsUrl(coordinates)}
            rel="noopener noreferrer"
            target="_blank"
            onClick={track.bind(null, { action: 'google-map-opened', label: `${emoji} ${title}` })}
          >
            {formatcoords(coordinates, true).format('DD MM X', {
              latLonSeparator: ', ',
              decimalPlaces: 2,
            })}
          </a>
        </div>
        <div className="legend__title">{title}</div>
      </div>
      <div className="legend__text">
        <TextWithParagraphs text={text} />
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
