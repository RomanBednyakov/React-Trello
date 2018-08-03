// import faker from 'faker';
import lists from './fake';
import CardsContainer from '../containers/Board/Cards/CardsContainer';
import React from 'react';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

export function getLists(quantity) {
  return dispatch => {
    dispatch({ type: GET_LISTS_START, quantity });
    setTimeout(() => {
      // let lists = [];
      // let count = 0;
      // for (let i = 0; i < quantity; i++) {
      //   const cards = [];
      //   const randomQuantity = 1;
      //   for (let ic = 0; ic < randomQuantity; ic++) {
      //     cards.push({
      //       id: count,
      //       firstName: faker.name.firstName(),
      //       lastName: faker.name.lastName(),
      //       title: faker.name.jobTitle()
      //     });
      //     count = count + 1;
      //   }
      //   lists.push({
      //     id: i,
      //     name: faker.commerce.productName(),
      //     cards
      //   });
      // }
      // console.log('fake', fake);
      // console.log('lists', lists);
      // lists = fake;
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
