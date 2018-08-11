import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ListsActions from '../../../actions/lists';

function mapStateToProps(state) {
  return {
    activeBoard: state.lists.activeBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    removeCard: PropTypes.func.isRequired,
    activeBoard: PropTypes.string.isRequired || PropTypes.number.isRequired,
    style: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(event) {
    event.preventDefault();
    this.props.removeCard(event.target.id, this.props.activeBoard);
  }
  render() {
    const { style, item } = this.props;
    return (
      <div style={style} className="item" id={style ? item.card_id : null}>
        <div className="item-name">{item.title}
          <span id={item.card_id} onClick={this.handleDelete} className="board_card-delete" />
        </div>
        <div className="item-container">
          <div className="item-content">
            <p>{`${item.content_card}`}</p>
          </div>
        </div>
      </div>
    );
  }
}
// import React, { PropTypes } from 'react';
//
// const propTypes = {
//   item: PropTypes.object.isRequired,
//   activeBoard: PropTypes.number.isRequired,
//   style: PropTypes.object
// };
//
// const Card = (props) => {
//   const { style, item } = props;
//   return (
//     <div style={style} className="item" id={style ? item.card_id : null}>
//       <div className="item-name">{item.title} <span className="board_card-delete" /></div>
//       <div className="item-container">
//         <div className="item-content">
//           <p>{`${item.content_card}`}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// Card.propTypes = propTypes;
//
// export default Card;
