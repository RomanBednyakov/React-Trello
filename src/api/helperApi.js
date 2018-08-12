import { GET_LISTS, REDIRECT_HOME, REDIRECT_LOGIN } from '../actions/lists';

function compareAge(posA, posB) {
  return posA.pos - posB.pos;
}

class Help {
  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  saveToken = (response) => {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    return response;
  };

  addNewLists = (dispatch, response, idBoard) => {
    const lists = response.data.columns;
    lists.sort(compareAge);
    lists.map((item) => item.cards.sort(compareAge));
    dispatch({ type: GET_LISTS, lists, isFetching: true, activeBoard: idBoard });
  };

  errorMessage = (dispatch, error) => {
    if (error.response.data.message === 'token not verify') {
      dispatch({ type: REDIRECT_HOME, redirectHome: false });
      dispatch({ type: REDIRECT_LOGIN, redirectLogin: true });
    }
    console.log('error', error.response.data.message);
  }
}

const help = new Help();
export default help;
