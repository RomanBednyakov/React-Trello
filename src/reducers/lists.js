import { Record } from 'immutable';

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  REDIRECT_HOME,
  REDIRECT_LOGIN,
  ERROR_LOGIN,
  GET_BOARDS,
  DELETE_BOARDS,
} from '../actions/lists';

/* eslint-disable new-cap */
const InitialState = Record({
  isFetching: false,
  lists: [],
  boards: [],
  isDragging: false,
  redirectHome: false,
  errorLogin: false,
  redirectLogin: false,
  activeBoard: '',
});
/* eslint-enable new-cap */
const initialState = new InitialState;


export default function lists(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set('isFetching', true);
    case GET_LISTS:
      return state.withMutations((ctx) => {
        ctx.set('isFetching', false)
            .set('lists', action.lists)
              .set('activeBoard', action.activeBoard);
      });
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY } = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case MOVE_LIST: {
      const newLists = [...state.lists];
      const { lastX, nextX } = action;
      const t = newLists.splice(lastX, 1)[0];

      newLists.splice(nextX, 0, t);

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case TOGGLE_DRAGGING: {
      return state.set('isDragging', action.isDragging);
    }
    case REDIRECT_HOME: {
      return state.set('redirectHome', action.redirectHome);
    }
    case REDIRECT_LOGIN: {
      return state.set('redirectLogin', action.redirectLogin);
    }
    case ERROR_LOGIN: {
      return state.set('errorLogin', action.errorLogin);
    }
    case GET_BOARDS: {
      return state.set('boards', action.boards);
    }
    case DELETE_BOARDS:
      return state.withMutations((ctx) => {
        ctx.set('boards', action.boards)
          .set('activeBoard', action.activeBoard);
      });
    default:
      return state;
  }
}
