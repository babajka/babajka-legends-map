import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TextWithParagraphs = ({ text }) => {
  const paragraphs = text.split('\n');
  const lastParagraphIndex = paragraphs.length - 1;

  return paragraphs.map((paragraph, i) => (
    <Fragment key={i}>
      {paragraph}
      {i < lastParagraphIndex && (
        <>
          <br />
          <br />
        </>
      )}
    </Fragment>
  ));
};

TextWithParagraphs.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithParagraphs;
