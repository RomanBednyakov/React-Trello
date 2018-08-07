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
    // redirect: PropTypes.func.isRequired,
    redirectLogin: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      // redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { login, password } = this.state;
    this.props.registration(login, password);
    // this.setState({
    //   login: '',
    //   password: '',
    // });
  }
  handleLogin(event) {
    this.setState({ ...this.state, login: event.target.value });
  }
  handlePassword(event) {
    this.setState({ ...this.state, password: event.target.value });
  }
  // changeRedirectState() {
  //   this.props.loginRedirect();
  // }
  render() {
    const loginPage = this.props.redirectLogin ? <Redirect to="/login" /> : null;
    // if (this.state.redirect) {
    //   this.changeStateRedirect(false);
    // }
    return (
      <div>
        <h1>Registration</h1>
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
          <button onClick={this.handleSubmit}>registration</button>
        </form>
        {loginPage}
        <h3><Link href="../Login/index.js" to="/login">Go to login</Link></h3>
      </div>
    );
  }
}
