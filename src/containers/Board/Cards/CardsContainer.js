import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import Cards from './Cards';
import { bindActionCreators } from 'redux';
import * as ListsActions from '../../../actions/lists';
import { connect } from 'react-redux';
function mapStateToProps(state) {
  return {
    activeBoard: state.lists.activeBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};

@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
@connect(mapStateToProps, mapDispatchToProps)
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    removeColumn: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    activeBoard: PropTypes.string.isRequired || PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteColumn = this.deleteColumn.bind(this);
  }

  deleteColumn(event) {
    this.props.removeColumn(event.target.id, this.props.activeBoard);
  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head">
          <div className="desk-name">{item.name_column}</div>
          <div
            onClick={this.deleteColumn}
            id={item.column_id}
            className="desk-remove" placeholder="remove column"
          />
        </div>
        <Cards
          moveCard={moveCard}
          x={x}
          column_id={item.column_id}
          cards={item.cards}
          activeBoard={this.props.activeBoard}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />
      </div>
    ));
  }
}
