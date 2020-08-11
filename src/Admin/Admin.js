import React, { Component } from 'react';

import fire from './Firebase/config/Fire';

import Signin from './components/Signin/Signin';
import Dashboard from './components/Dashboard/Dashboard';

export default class Admin extends Component {
  state = {
    user: {},
    email: '',
    password: '',
    error: null,
  };

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };
  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleLogin = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((e) => {
        this.setState({ error: e.message });
      });
  };

  render() {
    return (
      <div>
        {this.state.user ? (
          <Dashboard />
        ) : (
          <Signin
            error={this.state.error}
            email={this.state.email}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange}
          />
        )}
      </div>
    );
  }
}
