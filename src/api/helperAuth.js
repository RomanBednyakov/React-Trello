// import config from '../config/index';

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
    // config.token = response.data.token;
    return response;
  }
}

const help = new Help();
export default help;
