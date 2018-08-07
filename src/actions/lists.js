import lists from './fake';
import config from '../config/config.dev';
import api from '../api/api';
import help from '../api/helperAuth';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';
export const REDIRECT_HOME = 'REDIRECT_HOME';
export const REDIRECT_LOGIN = 'REDIRECT_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';

export function getLists(quantity) {
  return dispatch => {
    dispatch({ type: GET_LISTS_START, quantity });
    setTimeout(() => {
      function compareAge(posA, posB) {
        return posA.pos - posB.pos;
      }
      lists.sort(compareAge);
      lists.map((item) => item.cards.sort(compareAge));
      dispatch({ type: GET_LISTS, lists, isFetching: true });
    }, 1000); // fake delay
    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY, idCard) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY, idCard });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}

export function logining(login, password) {
  const userData = {
    name: login,
    password,
  };
  const url = new URL(`${config.hrefUrl}/auth`);
  url.search = new URLSearchParams(userData);
  return (dispatch) => {
    localStorage.removeItem('token');
    // config.token = null;
    return api.get(url)
      .then(help.checkStatus)
      .then(help.saveToken)
      .then(() => dispatch({ type: REDIRECT_HOME, redirectHome: true }))
      .catch(() => dispatch({ type: ERROR_LOGIN, errorLogin: true }));
  };
}

export function registration(login, password) {
  const data = {
    name: login,
    password,
  };
  localStorage.removeItem('token');
  // config.token = null;
  return (dispatch) => {
    return api.post(`${config.hrefUrl}/auth`, data)
      .then(help.checkStatus)
      .then(() => dispatch({ type: REDIRECT_LOGIN, redirectLogin: true }))
      .catch((error) => { console.log('error', error); });
  };
}

export function loginRedirect() {
  return (dispatch) => {
    dispatch({ type: REDIRECT_LOGIN, redirectLogin: false });
  };
}
export function homeRedirect() {
  return (dispatch) => {
    dispatch({ type: REDIRECT_HOME, redirectHome: false });
  };
}
