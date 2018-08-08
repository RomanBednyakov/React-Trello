import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as ListsActions from '../../actions/lists';

function mapStateToProps(state) {
  return {
    redirectHome: state.lists.redirectHome,
    errorLogin: state.lists.errorLogin
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
  static propTypes = {
    logining: PropTypes.func.isRequired,
    loginRedirect: PropTypes.func.isRequired,
    errorLogin: PropTypes.bool.isRequired,
    redirectHome: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.changeRedirectState = this.changeRedirectState.bind(this);
  }
  handleLogin(event) {
    this.setState({ ...this.state, login: event.target.value });
  }
  handlePassword(event) {
    this.setState({ ...this.state, password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.logining(this.state.login, this.state.password);
    // this.setState({ login: '', password: '' });
  }
  changeRedirectState() {
    this.props.loginRedirect();
  }

  render() {
    const homePage = this.props.redirectHome ? <Redirect to="/home" /> : null;
    return (
      <div>
        <h1>login</h1>
        <form className="signIn-form">
          <input
            name="login"
            type="text"
            placeholder="login"
            onChange={this.handleLogin}
          />
          <input
            name="pass"
            type="text"
            placeholder="password"
            onChange={this.handlePassword}
          />
          <a className="button" onClick={this.handleSubmit}>login</a>
        </form>
        {this.props.errorLogin ? <div>Wrong login or password</div> : ''}
        {homePage}
        <h3>
          <Link
            onClick={this.changeRedirectState}
            href="../registration/registration.js" to="/registration"
            className="button"
          >
            Go to registration
          </Link>
        </h3>
      </div>
    );
  }
}
