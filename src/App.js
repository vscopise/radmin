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
      categoriesSelected: [],
      status: Constants.status,
      statusSelected: [],
      dateBefore: '',
      dateAfter: '',
      isLoading: false,
      loadingPosts: false,
      posts: [],
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
    .then( this.fetchPosts )
    .catch(error => console.log(error))
  }

  fetchPost = (post) => {
    this.setState({ post })
  }

  fetchPosts = () => {
      this.setState({
          loadingPosts: true,
          posts: [],
      });
      
      let statusToFetch = '';
      if (this.state.statusSelected.length > 0) {
          statusToFetch = '?status=' + this.state.statusSelected.join(',');
      } else {
          statusToFetch = '?status=publish';
      }
      
      let catToFetch = '';
      if (this.state.categoriesSelected.length > 0) {
          catToFetch = '&categories=' + this.state.categoriesSelected.join(',');
      }

      let dateBeforeToFetch = '';
      if (this.state.dateBefore !== '') {
          dateBeforeToFetch = '&before=' + this.state.dateBefore + 'T00:00:00';
      }

      let dateAfterToFetch = '';
      if (this.state.dateAfter !== '') {
          dateAfterToFetch = '&after=' + this.state.dateAfter + 'T00:00:00';
      }
      
      fetch(Constants.apiUrl + 'wp/v2/posts/' + statusToFetch + catToFetch + dateBeforeToFetch + dateAfterToFetch, {
          headers: new Headers({
              Authorization: `Bearer ${this.state.token}`
          }),
      })   
      .then(response => response.json())
      .then(posts => this.setState({
          posts: posts,
          loadingPosts: false
      }))
      .catch(error => console.log(error))
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

  handleCategoriesChange = event => {
    this.setState({
        categoriesSelected: event.target.value,
    })
  }

  handleStatusChange = event => {
    this.setState({
        statusSelected: event.target.value,
    })
  }

  handleAfterDateChange = event => {
    this.setState({
        dateAfter: event.target.value
    })
  }

  handleBeforeDateChange = event => {
      this.setState({
          dateBefore: event.target.value
      })
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
            categoriesSelected = {this.state.categoriesSelected}
            handleCategoriesChange = {this.handleCategoriesChange}
            users = {this.state.users}
            status = {this.state.status}
            statusSelected = {this.state.statusSelected}
            handleStatusChange = {this.handleStatusChange}
            handleAfterDateChange = {this.handleAfterDateChange}
            handleBeforeDateChange = {this.handleBeforeDateChange}
            fetchPosts = {this.fetchPosts}
            posts = {this.state.posts}
            loadingPosts = {this.state.loadingPosts}
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