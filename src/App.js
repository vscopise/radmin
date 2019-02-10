import React, { Component } from 'react';
import SignIn from './components/SignIn';
import * as Constants from './assets/Constants';
import PostsTable from './components/PostsTable';
import PostEditor from './components/PostEditor';

import {
  withStyles,
} from '@material-ui/core';
import styles from './styles/Styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      disableSubmitLogin: true,
      token: false,
      post: false,
      users: false,
      categories: false,
      status: Constants.status,
      isLoading: false,
    };
  }

  handleUsername = (value) => {
    this.setState({
      username: value,
      disableSubmitLogin: !(
          this.state.username !== '' && 
          this.state.password !== ''
      )
    })
  }

  handlePassword = (value) => {
    this.setState({
      password: value,
      disableSubmitLogin: !(
          this.state.username !== '' && 
          this.state.password !== ''
      )
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
    .then( this.fetchUsers )
    .then( this.fetchCategories )
    .catch(error => console.log(error))
  }

  fetchPost = (post) => {
    this.setState({ post })
  }

  fetchCategories = () => {
    fetch(Constants.apiUrl + 'wp/v2/categories?per_page=99', {
        headers: {
            authorization: 'Bearer ' + this.state.token,
        }, 
      })
    .then(response => response.json())
    .then(categories => this.setState({
        categories,
        isLoading: false,
    }))
    .catch(error => console.log(error))
  }

  fetchUsers = () => {
    fetch(Constants.apiUrl + 'wp/v2/users?per_page=99', {
        headers: {
            authorization: 'Bearer ' + this.state.token,
        }, 
      })
    .then(response => response.json())
    .then(users => this.setState({
        users,
    }))
    .catch(error => console.log(error))
  }


  handleClose = () => {
    this.setState({
        post: false
    })
  }

  handleCategoriesChange = (categories) => {
    
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.App}>
        {
          ( !this.state.token ||
          this.state.isLoading ) &&
          <SignIn 
            username = {this.handleUsername}
            password = {this.handlePassword}
            disabled = {this.state.disableSubmitLogin}
            fetchToken = {this.fetchToken}
            isLoading = {this.state.isLoading}
          />
        }
        {
          this.state.token &&
          !this.state.post &&
          <PostsTable 
            token = {this.state.token}
            fetchPost = {this.fetchPost}
            categories = {this.state.categories}
            users = {this.state.users}
            status = {this.state.status}
            handleCategoriesChange = {this.handleCategoriesChange}
          />
        }
        {
          this.state.post &&
          <PostEditor 
              postContent = {this.state.post}
              postStatuses = {this.state.postStatuses}
              handleClose = {this.handleClose}
              categories = {this.state.categories}
          />
        }
      </div>
    );
  }
}

export default withStyles(styles)(App);