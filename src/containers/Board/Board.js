import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as ListsActions from '../../actions/lists';

import CardsContainer from './Cards/CardsContainer';
import CustomDragLayer from './CustomDragLayer';
import BoardForm from './BoardList/BoardForm';
import BardList from './BoardList/BardList';
import { Link, Redirect } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    lists: state.lists.lists,
    activeBoard: state.lists.activeBoard,
  };
}
const logo = require('../../assets/images/trello-logo-blue.png');
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    homeRedirect: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    activeBoard: PropTypes.string.isRequired || PropTypes.number.isRequired,
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
    this.changeRedirectState = this.changeRedirectState.bind(this);
    this.state = {
      isScrolling: false,
      isHovering: false,
    };
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
    console.log(111);
    this.props.moveCard(lastX, lastY, nextX, nextY, idCard);
    // const { lists } = this.props;
    // lists.map((listsItem, i) => {
    //   if (i === nextX) {
    //     listsItem.cards.map((item, index) => {
    //       const newItem = item;
    //       if (item.card_id === idCard) {
    //         if (index === 0 && listsItem.cards[index + 1] === undefined) {
    //           newItem.pos_card = 65535;
    //         } else if (listsItem.cards[index + 1] === undefined) {
    //           newItem.pos_card = listsItem.cards[index - 1].pos_card * 2;
    //         } else if (index === 0 && listsItem.cards[index + 1] !== undefined) {
    //           newItem.pos_card = listsItem.cards[index + 1].pos_card / 2;
    //         } else {
    //           newItem.pos_card =
    //             (listsItem.cards[index - 1].pos_card + listsItem.cards[index + 1].pos_card) / 2;
    //         }
    //         newItem.column_id = listsItem.card_id;
    //       }
    //       return newItem;
    //     });
    //   }
    //   return listsItem;
    // });
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId, nextX);
    this.props.moveList(lastX, nextX);
  }

  findList(id, nextX) {
    const { lists } = this.props;
    const list = lists.filter(l => l.column_id === id)[0];
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
  changeRedirectState() {
    localStorage.removeItem('token');
    this.props.homeRedirect();
  }

  render() {
    const { lists, activeBoard } = this.props;
    const loginPage =
      localStorage.getItem('token') === null || localStorage.getItem('token') === undefined
        ? <Redirect to="/login" /> : null;

    const content = activeBoard ?
      <main>
        <CustomDragLayer snapToGrid={false} />
        {lists.map((item, i) =>
          <CardsContainer
            key={item.column_id}
            id={item.column_id}
            item={item}
            moveCard={this.moveCard}
            moveList={this.moveList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}
          />
        )}
        <div className="add_column">
          <BoardForm add={'column'} position={65535} id={this.props.lists.length} />
        </div>
      </main>
      : null;
    return (
      <div className="content">
        <div className="header">
          <BardList />
          <a className="header_logo"><img src={logo} alt="Delete perfomers" /></a>
          <Link
            onClick={this.changeRedirectState}
            href="../login/login.js" to="/login"
            className="button"
          >Logout</Link>
        </div>
        {content}
        {loginPage}
      </div>
    );
  }
}
