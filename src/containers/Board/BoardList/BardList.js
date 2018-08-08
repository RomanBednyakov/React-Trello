import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ListsActions from '../../../actions/lists';
import BoardForm from './BoardForm';
function mapStateToProps(state) {
  return {
    boards: state.lists.boards,
    activeBoard: state.lists.activeBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardList extends Component {
  static propTypes = {
    getBoards: PropTypes.func.isRequired,
    removeBoard: PropTypes.func.isRequired,
    getLists: PropTypes.func.isRequired,
    boards: PropTypes.array.isRequired,
    activeBoard: PropTypes.string.isRequired || PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      id: '',
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.getBoardList = this.getBoardList.bind(this);
  }
  componentWillMount() {
    this.props.getBoards();
  }
  getBoardList(event) {
    if (event.target.className !== 'board_card-delete') {
      this.setState({ isHovering: !this.state.isHovering });
      this.props.getLists(event.target.id);
      event.preventDefault();
    }
  }
  deleteBoard(event) {
    this.props.removeBoard(event.target.id, this.props.activeBoard);
  }
  handleMouseHover() {
    this.setState({ isHovering: !this.state.isHovering });
  }

  render() {
    const { boards } = this.props;
    return (
      <div onMouseLeave={this.handleMouseHover}>
        <a
          className="button"
          onClick={this.handleMouseHover}
        >
          boards
        </a>
        {
          this.state.isHovering &&
            <div className="header_board_position">
              <div className="header_board_position_content">
                {boards.map((item, i) =>
                  <div
                    onClick={this.getBoardList} id={item.board_id} className="board_card" key={i}
                  >
                    <span className="board_card_span"
                      onClick={this.getBoardList}
                      id={item.board_id}
                    >
                      {item.name_board}
                    </span>
                    <a
                      id={item.board_id}
                      onClick={this.deleteBoard}
                      className="board_card-delete"
                    />
                  </div>
                )}
                <BoardForm add={'board'} position={65545} id={this.props.boards.length} />
              </div>
            </div>
        }
      </div>
    );
  }
}
