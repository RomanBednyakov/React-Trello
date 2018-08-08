import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const Card = (props) => {
  const { style, item } = props;
  return (
    <div style={style} className="item" id={style ? item.card_id : null}>
      <div className="item-name">{item.title}</div>
      <div className="item-container">
        <div className="item-content">
          <p>{`${item.content_card}`}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
