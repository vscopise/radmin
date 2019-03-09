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
      //postColgado: '',
      //postTitle: '',
      //postExcerpt: '',
      //postStatus: [],
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
      mediaItems: false,
      searchItems: '',
      imageDetail: false,
      postFeaturedImage: false,
      uploadFile: false,
      previewImgUrl: false,
      tabsValue: 1,
      postUpdated: false,
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
        postId: post.id,
        postUpdated: false,
        messagePost: '',
      })
      //this.fetchFeaturedImage()
  }

  newPost = () => {
    this.setState({
      post: {
        status: 'draft',
        date: new Date().toISOString().slice(0,16),
        tags: [],
        categories: [1],
        content: {rendered: ''},
        title: {rendered: ''},
        excerpt: {rendered: ''},
        messagePost: '',
      },
      //postFeaturedImage: false,
      //isLoading: false,
    });
  }

  // fetchFeaturedImage = () => {
  //     this.setState({ 
  //       isLoading: true, 
  //       postFeaturedImage: false
  //     })
  //     if (this.state.post.featured_media) {
  //       fetch(Constants.apiUrl + 'wp/v2/media/' + this.state.post.featured_media)  
  //       .then((response) => {
  //           if(response.ok) {
  //               response.json().then(image => {
  //                   this.setState({
  //                       postFeaturedImage: image,
  //                       isLoading: false,
  //                   })
  //               });
  //           } else {
  //               this.setState({
  //                   messageImage: 'Error cargando la imagen',
  //                   isLoading: false,
  //               });
  //           }
  //       })
  //       .catch((ex) => {
  //         this.setState({
  //             messageImage: 'Error cargando la imagen'
  //         });
  //       });
  //     } else {
  //       this.setState({
  //         isLoading: false,
  //       });
  //     }
  // }

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
      
      fetch(Constants.apiUrl + 'wp/v2/posts/' 
        + statusToFetch 
        + catToFetch 
        + tagToFetch 
        + dateBeforeToFetch 
        + dateAfterToFetch, {
          headers: new Headers({
              Authorization: `Bearer ${this.state.token}`
          }),
      })   
      .then(response => response.json())
      .then(posts => this.setState({
          posts: posts,
          loadingPosts: false
      }))
      .then(this.fetchFeaturedImage)
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
    let search = ('' === this.state.searchItems) ?
      '' : '&search=' + this.state.searchItems;
      this.setState({
        isLoading: true,
        imageDetail: false,
        mediaItems: []
      });
    fetch(Constants.apiUrl + 'wp/v2/media/?per_page=20' + search, {
        headers: {
            authorization: 'Bearer ' + this.state.token,
        }, 
      })
    .then(response => response.json())
    .then(mediaItems => this.setState({
        mediaItems,
        isLoading: false
    }))
    .catch(error => console.log(error))
  }

  handleClose = () => {
    this.setState({
        post: false
    });
    if (true === this.state.postUpdated) {
      this.fetchPosts();
    }
  }

  handleShowMediaLibrary = () => {
      this.setState({
          showMediaLibrary: true,
          postFeaturedImage: false,
      })
  }

  handleMediaConfirm = () => {
    this.setState({
      showMediaLibrary: false,
    });
  }

  handleMediaCancel = () => {
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        featured_media: false
      },
      postFeaturedImage: false,
      mediaSelected: false,
      showMediaLibrary: false,
      previewImgUrl: false,
      uploadFile: false
    }));
  }

  handleMediaSelect = (e, item) => {
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        featured_media: item.id
      },
      postFeaturedImage: item
    }));
  }

  handleChangeTab = (event, value) => {
    this.setState({ tabsValue: value });
  };

  handleUploadImage = () => {
    this.setState({
      isLoading: true
    });

    var data = new FormData()
    data.append('file', this.state.fileToUpload)

    fetch(Constants.apiUrl + 'wp/v2/media', {
      method: 'post',
      headers: {
        authorization: 'Bearer ' + this.state.token,
      },
      body: data
    })
    .then(res => res.json())
    .then((responseJson) => {
        this.fetchMediaItems();
        this.setState({
          isLoading: false,
          tabsValue: 1,
        });
       }
    )
    .catch(error => console.log(error))
  }

  generatePreviewImgUrl = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = e => callback(reader.result)
  }

  render() {
    return (
      <div className={this.props.classes.App}>
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
            newPost = {this.newPost}
            categories = {this.state.categories}
            categoriesSelected = {this.state.categoriesSelected}
            handleChange = {this.handleChange}
            tags = {this.state.tags}
            tagsSelected = {this.state.tagsSelected}
            users = {this.state.users}
            status = {this.state.status}
            statusSelected = {this.state.statusSelected}
            fetchPosts = {this.fetchPosts}
            posts = {this.state.posts}
            loadingPosts = {this.state.loadingPosts}
          />
        }
        {
          this.state.post &&
          !this.state.showMediaLibrary &&
          <PostEditor 
              token = {this.state.token}
              fetchPost = {this.fetchPost}
              fetchPosts = {this.fetchPosts}
              post = {this.state.post}
              status = {this.state.status}
              categories = {this.state.categories}
              tags = {this.state.tags}
              postFeaturedImage = {this.state.postFeaturedImage}
              fetchFeaturedImage = {this.fetchFeaturedImage}
              handleChange = {this.handleChange}
              handleClose = {this.handleClose}
              handleUpdatePost = {this.handleUpdatePost}
              handleShowMediaLibrary = {this.handleShowMediaLibrary}
              isLoading = {this.state.isLoading}
              messagePost = {this.state.messagePost}
          />
        }
        {
          this.state.showMediaLibrary &&
          <MediaLibrary
              mediaItems = {this.state.mediaItems}
              searchItems = {this.state.searchItems}
              postFeaturedImage = {this.state.postFeaturedImage}
              handleMediaConfirm = {this.handleMediaConfirm}
              handleMediaCancel = {this.handleMediaCancel}
              handleMediaSelect = {this.handleMediaSelect}
              handleChange = {this.handleChange}
              fetchMediaItems = {this.fetchMediaItems}
              isLoading = {this.state.isLoading}
              imageDetail = {this.state.imageDetail}
              handleimageDetail = {this.handleimageDetail}
              uploadFile={this.state.uploadFile}
              previewImgUrl={this.state.previewImgUrl}
              handleUploadImage={this.handleUploadImage}
              tabsValue={this.state.tabsValue}
              handleChangeTab={this.handleChangeTab}
          />
        }
      </div>
    );
  }
}

export default withStyles(styles)(App);