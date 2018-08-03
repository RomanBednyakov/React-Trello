import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as ListsActions from '../../actions/lists';

import CardsContainer from './Cards/CardsContainer';
import CustomDragLayer from './CustomDragLayer';

function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.findList = this.findList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false };
  }

  componentWillMount() {
    this.props.getLists(2);
  }

  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
    // }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  moveCard(lastX, lastY, nextX, nextY, idCard) {
    this.props.moveCard(lastX, lastY, nextX, nextY, idCard);
    const { lists } = this.props;
    lists.map((listsItem, i) => {
      if (i === nextX) {
        listsItem.cards.map((item, index) => {
          const newItem = item;
          if (item.id === idCard) {
            if (index === 0) {
              newItem.pos = 65535;
            } else if (listsItem.cards[index + 1] === undefined) {
              newItem.pos = listsItem.cards[index - 1].pos * 2;
            } else {
              newItem.pos = (listsItem.cards[index - 1].pos + listsItem.cards[index + 1].pos) / 2;
            }
            newItem.column_id = listsItem.id;
          }
          return newItem;
        });
      }
      return listsItem;
    });
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId, nextX);
    this.props.moveList(lastX, nextX);
  }

  findList(id, nextX) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];
    if (nextX === 0) {
      list.pos = lists[nextX].pos / 2;
    } else if (lists[nextX + 1] === undefined) {
      list.pos = lists[nextX].pos * 2;
    } else {
      list.pos = (lists[nextX - 1].pos + lists[nextX].pos) / 2;
    }
    return {
      list,
      lastX: lists.indexOf(list)
    };
  }

  render() {
    const { lists } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <div>SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</div>

        <CustomDragLayer snapToGrid={false} />
        {lists.map((item, i) =>
          <CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            moveCard={this.moveCard}
            moveList={this.moveList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}
          />
        )}
      </div>
    );
  }
}
