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
      categories: [],
      isLoading: false,
      //loadingCategories: true,
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
        //isLoading: false,
    })).then(this.fetchCategories)
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
        categories: categories,
        //loadingCategories: false,
        isLoading: false,
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
          (!this.state.token ||
          this.state.categories.length === 0) &&
          //this.state.loadingCategories &&
          //!this.state.isLoading) &&
          !this.state.post &&
          //!this.state.isLoading &&
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
          this.state.categories.length > 0 &&
          !this.state.post &&
          !this.state.isLoading &&
          <PostsTable 
            token={this.state.token}
            fetchPost={this.fetchPost}
            categories={this.state.categories}
            handleCategoriesChange={this.handleCategoriesChange}
          />
        }
        {
          this.state.post &&
          <PostEditor 
              postContent={this.state.post}
              postStatuses={this.state.postStatuses}
              handleClose={this.handleClose}
              categories={this.state.categories}
          />
        }
      </div>
    );
  }
}

export default withStyles(styles)(App);