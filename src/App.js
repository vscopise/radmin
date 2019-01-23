import React, { Component } from 'react';
import SignIn from './components/SignIn';
import * as Constants from './assets/Constants';
import PostsTable from './components/PostsTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      disableSubmitLogin: true,
      token: false,
      isLoading: false
    };
  }

  handleUsername = (value) => {
    this.setState({
      username: value,
      disableSubmitLogin: !(this.state.username!=='' && this.state.password!=='')
    })
  }

  handlePassword = (value) => {
    this.setState({
      password: value,
      disableSubmitLogin: !(this.state.username!=='' && this.state.password!=='')
    })
  }

  fetchToken = () => {
    this.setState({
      isLoading: true,
    })
    fetch(Constants.apiUrl + 'jwt-auth/v1/token', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => this.setState({
        token: data.token,
        isLoading: false,
    }))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {
          !this.state.token &&
          <SignIn 
            username={this.handleUsername}
            password={this.handlePassword}
            disabled={this.state.disableSubmitLogin}
            fetchToken={this.fetchToken}
            isLoading={this.state.isLoading}
          />
        }
        {
          this.state.token &&
          <PostsTable 
            token={this.state.token}
          />
        }
      </div>
    );
  }
}

export default App;
