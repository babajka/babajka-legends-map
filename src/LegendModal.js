import React from 'react';

import { LegendShape } from './constants';

const LegendModal = ({ legend: { emoji, emojiCode, coordinates, title, text }, onClose }) => (
  <div className="legend__modal">
    <div className="legend__content">
      <div className="legend__top">
        {!!emoji && <img className="legend__emoji" src={`./images/${emojiCode}.png`} alt={title} />}
        <div className="legend__coords">{coordinates.join(', ')}</div>
        <div className="legend__title">{title}</div>
      </div>
      <div className="legend__text">{text}</div>
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
