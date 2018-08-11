import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ListsActions from '../../../actions/lists';

function mapStateToProps(state) {
  return {
    activeBoard: state.lists.activeBoard,
    lists: state.lists.lists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardForm extends Component {
  static propTypes = {
    addBoard: PropTypes.func.isRequired,
    addColumn: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    add: PropTypes.string.isRequired,
    lists: PropTypes.array.isRequired,
    position: PropTypes.number.isRequired,
    activeBoard: PropTypes.string.isRequired || PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      boardTitle: '',
      boardContent: '',
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleAddBoard = this.handleAddBoard.bind(this);
    this.handleBoard = this.handleBoard.bind(this);
    this.handleContent = this.handleContent.bind(this);
  }
  handleMouseHover() {
    this.setState({ isHovering: !this.state.isHovering });
  }
  handleAddBoard() {
    this.setState({ isHovering: !this.state.isHovering });
    if (this.props.add === 'board') {
      this.props.addBoard(this.state.boardTitle);
    } else if (this.props.add === 'column') {
      if (this.props.lists.length > 0) {
        const lastItemPosition = this.props.lists[this.props.lists.length - 1].pos * 2;
        this.props.addColumn(this.state.boardTitle, this.props.activeBoard, lastItemPosition);
      } else {
        this.props.addColumn(this.state.boardTitle, this.props.activeBoard, this.props.position);
      }
    } else {
      this.props.addCard(
        this.state.boardTitle,
        this.props.activeBoard,
        this.state.boardContent,
        this.props.position,
        this.props.id
      );
    }
  }
  handleBoard(event) {
    this.setState({ ...this.state, boardTitle: event.target.value });
  }
  handleContent(event) {
    this.setState({ ...this.state, boardContent: event.target.value });
  }
  render() {
    const content = this.props.add === 'cards'
      ? <textarea onChange={this.handleContent}
        placeholder="Content" className="input_textarea"
      /> : null;

    const crateBoard = !this.state.isHovering ?
      <div className="board_add board_add_bg">
        <a
          className="button button_bg"
          onClick={this.handleMouseHover}
        >
          + Create new {this.props.add}...
        </a>
      </div>
      :
      <div className="board">
        <div>
          <textarea onChange={this.handleBoard} placeholder="Title" className="input_textarea" />
        </div>
        <div>{content}</div>
        <div className="board_buttons">
          <a onClick={this.handleAddBoard} className="button">add {this.props.add}</a>
          <a onClick={this.handleMouseHover} className="button_Close">close</a>
        </div>
      </div>;
    return (
      <div>
        {crateBoard}
      </div>
    );
  }
}
