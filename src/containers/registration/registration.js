import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as ListsActions from '../../actions/lists';

function mapStateToProps(state) {
  return {
    redirectLogin: state.lists.redirectLogin,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Registration extends Component {
  static propTypes = {
    registration: PropTypes.func.isRequired,
    redirectLogin: PropTypes.bool.isRequired,
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
  }
  handleSubmit(event) {
    event.preventDefault();
    const { login, password } = this.state;
    this.props.registration(login, password);
  }
  handleLogin(event) {
    this.setState({ ...this.state, login: event.target.value });
  }
  handlePassword(event) {
    this.setState({ ...this.state, password: event.target.value });
  }
  render() {
    const loginPage = this.props.redirectLogin ? <Redirect to="/login" /> : null;
    return (
      <div className="form">
        <div className="form_content">
          <h1 className="form_title">Create a Trello Account</h1>
          <form className="signIn-form">
            <input
              name="login"
              type="text"
              placeholder="username"
              className="form_input"
              onChange={this.handleLogin}
            />
            <input
              name="pass"
              type="text"
              placeholder="password"
              className="form_input"
              onChange={this.handlePassword}
            />
            <a className="button form_Button" onClick={this.handleSubmit}>Create New Account</a>
          </form>
          {loginPage}
          <h3>
            <Link
              className="button"
              href="../login/login.js" to="/login"
            >sign in to your account</Link>
          </h3>
        </div>
      </div>
    );
  }
}
