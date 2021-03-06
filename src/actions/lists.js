import config from '../config/config.dev';
import api from '../api/api';
import help from '../api/helperApi';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const GET_BOARDS = 'GET_BOARDS';
export const DELETE_BOARDS = 'DELETE_BOARDS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';
export const REDIRECT_HOME = 'REDIRECT_HOME';
export const REDIRECT_LOGIN = 'REDIRECT_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';

export function getLists(idBoard) {
  const data = { idBoard };
  const url = new URL(`${config.hrefUrl}/columns`);
  url.search = new URLSearchParams(data);
  return (dispatch) => {
    return api.get(url)
      .then(help.checkStatus)
      .then((response) => {
        help.addNewLists(dispatch, response, idBoard);
      })
      .then(dispatch({ type: GET_LISTS_START, isFetching: false }))
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
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
    return api.get(url)
      .then(help.checkStatus)
      .then(help.saveToken)
      .then(() => dispatch({ type: REDIRECT_LOGIN, redirectLogin: false }))
      .then(() => dispatch({ type: REDIRECT_HOME, redirectHome: true }))
      .catch((error) => console.log(error));
  };
}

export function registration(login, password) {
  const data = {
    name: login,
    password,
  };
  localStorage.removeItem('token');
  return (dispatch) => {
    return api.post(`${config.hrefUrl}/auth`, data)
      .then(help.checkStatus)
      .then(() => dispatch({ type: REDIRECT_LOGIN, redirectLogin: true }))
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function addBoard(title) {
  const data = {
    title,
  };
  return (dispatch) => {
    return api.post(`${config.hrefUrl}/boards/`, data)
      .then(help.checkStatus)
      .then((response) => dispatch({ type: GET_BOARDS, boards: response.data.boards }))
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function getBoards() {
  return (dispatch) => {
    return api.get(`${config.hrefUrl}/boards/`)
      .then(help.checkStatus)
      .then((response) => dispatch({ type: GET_BOARDS, boards: response.data.boards }))
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function removeBoard(id, activeBoard) {
  const active = id === activeBoard ? '' : activeBoard;
  const data = {
    id,
  };
  return (dispatch) => {
    return api.delete(`${config.hrefUrl}/boards/`, data)
      .then(help.checkStatus)
      .then((response) =>
        dispatch({ type: DELETE_BOARDS, boards: response.data.boards, activeBoard: active }))
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}

export function addColumn(title, idBoard, pos) {
  const data = {
    title,
    idBoard,
    pos
  };
  return (dispatch) => {
    return api.post(`${config.hrefUrl}/columns/`, data)
      .then(help.checkStatus)
      .then((response) => {
        help.addNewLists(dispatch, response, idBoard);
      })
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function removeColumn(coulmnId, idBoard) {
  const data = {
    coulmnId,
    idBoard,
  };
  return (dispatch) => {
    return api.delete(`${config.hrefUrl}/columns/`, data)
      .then(help.checkStatus)
      .then((response) => {
        help.addNewLists(dispatch, response, idBoard);
      })
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function changePosColumn(columnsId, pos) {
  const data = {
    columnsId,
    pos,
  };
  return (dispatch) => {
    return api.put(`${config.hrefUrl}/columns/`, data)
      .then(help.checkStatus)
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function addCard(title, idBoard, content, pos, idColumn) {
  const data = {
    title,
    idBoard,
    pos,
    content,
    idColumn
  };
  return (dispatch) => {
    return api.post(`${config.hrefUrl}/columns/card`, data)
      .then(help.checkStatus)
      .then((response) => {
        help.addNewLists(dispatch, response, idBoard);
      })
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function removeCard(cardId, idBoard) {
  const data = {
    cardId,
    idBoard,
  };
  return (dispatch) => {
    return api.delete(`${config.hrefUrl}/columns/card`, data)
      .then(help.checkStatus)
      .then((response) => {
        help.addNewLists(dispatch, response, idBoard);
      })
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
  };
}
export function changePosCard(cardId, pos, columnId) {
  const data = {
    cardId,
    pos,
    columnId
  };
  return (dispatch) => {
    return api.put(`${config.hrefUrl}/columns/card`, data)
      .then(help.checkStatus)
      .catch((error) => {
        help.errorMessage(dispatch, error);
      });
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
