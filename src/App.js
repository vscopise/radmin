import React, { Component } from 'react';
import SignIn from './components/SignIn';
import * as Constants from './assets/Constants';
import PostsTable from './components/PostsTable';
import PostEditor from './components/PostEditor';

import {
  withStyles,
} from '@material-ui/core';
import styles from './styles/Styles';
import MediaLibrary from './components/MediaLibrary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      disableSubmitLogin: true,
      token: false,
      post: false,
      postColgado: '',
      postTitle: '',
      postExcerpt: '',
      //postFeaturedImage: false,
      postStatus: [],
      posts: [],
      categories: false,
      categoriesSelected: [],
      tags: false,
      tagsSelected: [],
      users: false,
      status: Constants.status,
      statusSelected: [],
      dateBefore: '',
      dateAfter: '',
      isLoading: false,
      loadingPosts: false,
      showMediaLibrary: false,
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
    .then( this.fetchTags )
    .then( this.fetchPosts )
    .then( this.fetchMediaItems )
    .catch(error => console.log(error))
  }

  fetchPost = (post) => { 
      this.setState({ 
        post,
        //postColgado: post.colgado,
        //postTitle: post.title.rendered,
        //postExcerpt: post.excerpt.rendered.replace(/(\r\n|\n|\r|<[^>]*>)/gm, ''),
       })
      //this.fetchFeaturedImage(post.featured_media)
  }

  fetchFeaturedImage = () => {
      this.setState({ isLoading: true })
      fetch(Constants.apiUrl + 'wp/v2/media/' + this.state.post.featured_media, {
          headers:{
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': 'Bearer ' + this.state.token
          }
      })
      .then((response) => {
          if(response.ok) {
              response.json().then(image => {
                  this.setState({
                      postFeaturedImage: image.media_details.sizes.thumbnail.source_url,
                      isLoading: false,
                  })
              });
          } else {
              this.setState({
                  messageImage: 'Error cargando la imagen',
                  isLoading: false,
              });
          }
      })
      .catch((ex) => {
        this.setState({
            messageImage: 'Error cargando la imagen'
        });
      });
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

      let tagToFetch = '';
      if (this.state.tagsSelected.length > 0) {
        tagToFetch = '&tags=' + this.state.tagsSelected.join(',');
      }

      let dateBeforeToFetch = '';
      if (this.state.dateBefore !== '') {
          dateBeforeToFetch = '&before=' + this.state.dateBefore + 'T00:00:00';
      }

      let dateAfterToFetch = '';
      if (this.state.dateAfter !== '') {
          dateAfterToFetch = '&after=' + this.state.dateAfter + 'T00:00:00';
      }
      
      fetch(Constants.apiUrl + 'wp/v2/posts/' + statusToFetch + catToFetch + tagToFetch + dateBeforeToFetch + dateAfterToFetch, {
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
        //isLoading: false,
    }))
    .catch(error => console.log(error))
  }

  fetchTags = () => {
    fetch(Constants.apiUrl + 'wp/v2/tags?per_page=99', {
        headers: {
            authorization: 'Bearer ' + this.state.token,
        }, 
      })
    .then(response => response.json())
    .then(tags => this.setState({
        tags,
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

  fetchMediaItems = () => {
    fetch(Constants.apiUrl + 'wp/v2/media', {
        headers: {
            authorization: 'Bearer ' + this.state.token,
        }, 
      })
    .then(response => response.json())
    .then(mediaItems => this.setState({
        mediaItems
    }))
    .catch(error => console.log(error))
  }

  handleClose = () => {
    this.setState({
        post: false
    })
  }

  handleShowMediaLibrary = () => {
      this.setState({
          showMediaLibrary: ! this.state.showMediaLibrary
      })
  }

  handleMediaClose = () => {
    this.setState({
      showMediaLibrary: false,
    });
  }

  handleMediaSelect = () => {
    this.setState({
      
    })
  }
  handleChange = event => {
      let change = {}
      change[event.target.name] = event.target.value
      this.setState(change)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.App}>
        {
          !this.state.token &&
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
            //handleCategoriesChange = {this.handleCategoriesChange}
            handleChange = {this.handleChange}
            tags = {this.state.tags}
            tagsSelected = {this.state.tagsSelected}
            //handleTagsChange = {this.handleTagsChange}
            users = {this.state.users}
            status = {this.state.status}
            statusSelected = {this.state.statusSelected}
            //handleStatusChange = {this.handleStatusChange}
            handleAfterDateChange = {this.handleAfterDateChange}
            handleBeforeDateChange = {this.handleBeforeDateChange}
            handleChange = {this.handleChange}
            fetchPosts = {this.fetchPosts}
            posts = {this.state.posts}
            loadingPosts = {this.state.loadingPosts}
            handleChange = {this.handleChange}
          />
        }
        {
          this.state.post &&
          !this.state.showMediaLibrary &&
          <PostEditor 
              token = {this.state.token}
              post = {this.state.post}
              postFeaturedImage = {this.state.postFeaturedImage}
              //postStatus = {this.state.postStatus}
              fetchFeaturedImage = {this.fetchFeaturedImage}
              handleChange = {this.handleChange}
              handleClose = {this.handleClose}
              categories = {this.state.categories}
              tags = {this.state.tags}
              handleShowMediaLibrary = {this.handleShowMediaLibrary}
              isLoading = {this.state.isLoading}
              status = {this.state.status}
          />
        }
        {
          this.state.showMediaLibrary &&
          <MediaLibrary
              mediaItems={this.state.mediaItems}
              handleMediaClose={this.handleMediaClose}
              handleMediaSelect={this.handleMediaSelect}
              handleChange={this.handleChange}
          />
        }
      </div>
    );
  }
}

export default withStyles(styles)(App);