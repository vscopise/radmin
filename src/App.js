import React, { Component } from 'react';
import { 
  EditorState, 
  convertToRaw,
  ContentState,
} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import Layout from './containers/layout/layout';
import Login from './components/login/Login';
import * as Constants from './assets/constants';
import MediaLibrary from './components/media-library/media-library';
import PostTable from './components/posts-table/posts-table';
import PostEditor from './components/post-editor/post-editor';
import ZoneEditor from './components/zone-editor/zone-editor';

class App extends Component {
  constructor(props) {
    super(props);

    let postEditorState = EditorState.createEmpty();
    let now = new Date();
    let postDate = now.toISOString().slice(0,11)
      + now.toLocaleTimeString();
    let months = [
      {id:1, name:'enero'},
      {id:2, name:'febrero'},
      {id:3, name:'marzo'},
      {id:4, name:'abril'},
      {id:5, name:'mayo'},
      {id:6, name:'junio'},
      {id:7, name:'julio'},
      {id:8, name:'agosto'},
      {id:9, name:'setiembre'},
      {id:10, name:'octubre'},
      {id:11, name:'noviembre'},
      {id:12, name:'diciembre'},
    ];
    this.state = {
      isLoading: false,
      token: false,
      userName: '',
      userPass: '',
      posts: false,
      postsFiltered: false,
      postId: false,
      postFeaturedMedia: false,
      media: false,
      categories: false,
      categorySelected: '0',
      months: months,
      tags: false,
      tagSelected: '0',
      users: false,
      saveMessage: false,
      selectedPosts: [],
      status: Constants.status,
      statusSelected: false,
      mediaItems: false,
      mediaCaption: '',
      mediaSelected: false,
      searchItem: '',
      dateBefore: '',
      dateAfter: '',
      postsTableHeadFields: Constants.postsTableHeadFields,
      perPage: 20,
      showWindow: 'PostTable',
      mediaMessage: false,

      postEditorState: postEditorState,
      postContent: '',
      postDate: postDate,
      postColgado: '',
      postTitle: '',
      postExcerpt: '',
      postRedactor: '',
      postCategories: [],
      postTags: [],
      postsZone: false,
      showFeaturedBox: false,
      showStatus: false,
      zones: false,
      //zonePosts: false,
      zoneSelected: false,
    }
  }

  handleContentChange = (postEditorState) => {
    this.setState({
        postEditorState,
        postContent: draftToHtml(
            convertToRaw(
                postEditorState.getCurrentContent()
            )
        ),
    });
  }

  handleChange = event => {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleClick = (event) => {
    let click = {};
    click[event.target.dataset.name] = parseInt(event.target.dataset.key);
    if('mediaSelected'===event.target.dataset.name) {
      let postFeaturedMedia = this.state.mediaItems.filter(
        mediaItem=>mediaItem.id===parseInt(event.target.dataset.key)
      )[0];
      this.setState({ postFeaturedMedia });
    };
    this.setState(click);
  }

  handleClose = () => {
    this.setState({
        postId: false
    });
  }

  handleShow = (e) => {
    let showWindow = e.target.dataset.window;
    this.setState({ 
      showWindow,
      mediaMessage: false,
    });
  }

  handleMediaSave = () => {
    this.setState({
      isLoading: true,
    });

    fetch(`${Constants.apiUrl}wp/v2/media/${this.state.mediaSelected}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        caption: this.state.mediaCaption
      })
    })
    .then ( this.fetchMediaItems )
    .catch(error => console.log(error))    
  }

  fetchToken = () => {
    this.setState({
      isLoading: true,
    }); 
    
    fetch(`${Constants.apiUrl}jwt-auth/v1/token`, {
      method: 'post',
      //mode: 'no-cors',
      //cache: 'no-cache',
      headers: new Headers({
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      }), 
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.userPass
      })
    })
    .then(res => {
      if (res.status===200) {
        res.json()
        .then( data => 
          this.setState({
            token: data.token,
        }))
        .then( this.fetchUsers )
        .then( this.fetchCategories )
        .then( this.fetchTags )
        .then( this.fetchPosts )
        .then( this.fetchZones )
        .then( this.fetchMediaItems ) 

      } else {
        this.setState({
          signupMessage: 'error',
          isLoading: false
        })
      }
    })
    .catch(error => console.log(error))
  }

  fetchPosts = () => {
    this.setState({
      isLoading: true,
    }); 
    //this.toggleLoading();

    let statusToFetch = '';
    if (this.state.statusSelected) {
        statusToFetch = '?status=' + this.state.statusSelected;
    } else {
        statusToFetch = '?status=publish,future';
    }
    let categorySelected = '';
    if ( this.state.categorySelected !== '0' ) {
      categorySelected = '&categories=' + this.state.categorySelected;
    
    }
    let tagSelected = '';
    if ( this.state.tagSelected !== '0' ) {
      categorySelected = '&tags=' + this.state.tagSelected;
    }

    let dateAfterToFetch = '';
    if (this.state.dateBefore !== '') {
      dateAfterToFetch = '&after=' + this.state.dateBefore.toISOString();
    }

    let dateBeforeToFetch = '';
    if (this.state.dateAfter !== '') {
      dateBeforeToFetch = '&before=' + this.state.dateAfter.toISOString();
    }

    let perPage = '&per_page=' + this.state.perPage;
    
    fetch(Constants.apiUrl + 'wp/v2/posts/' 
      + statusToFetch 
      + categorySelected 
      + tagSelected 
      + dateBeforeToFetch 
      + dateAfterToFetch 
      + perPage, {
        headers: new Headers({
            Authorization: `Bearer ${this.state.token}`
        }),
    })   
    .then(response => response.json())
    .then(posts => {
      this.setState({
        posts: posts,
        //postsFiltered: posts,
        //loadingPosts: false,
        isLoading: false
      });
      //this.toggleLoading();
    })
    .then(this.fetchFeaturedImage)
    .catch(error => console.log(error))
  }

  fetchCategories = () => {
    this.setState({
      isLoading: true,
    });
    //fetch(Constants.apiUrl + 'wp/v2/categories', {
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

  fetchTags = () => {
    this.setState({
      isLoading: true,
    });
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
    this.setState({
      isLoading: true,
    });
    fetch(Constants.apiUrl + 'wp/v2/users/?per_page=99')
    .then(response => response.json())
    .then(users => this.setState({
      users,
      //isLoading: false
    }))
    .catch(error => console.log(error))
  }

  fetchZones = () => {
    fetch(`${Constants.apiUrl}zoninator/v1/zones`)
    .then(response => response.json())
    .then(zones => {
      this.setState({
        zones,
        zoneSelected: zones[0].term_id
      });
      this.fetchPostsZone(zones[0].term_id);
    })
    .catch(error => console.log(error))
  }

  fetchPostsZone = (zoneId) => {
    this.setState({
      isLoading: true,
    });
    fetch(`${Constants.apiUrl}zoninator/v1/zones/${zoneId}/posts`)
    .then(response => response.json())
    .then(postsZone => this.setState({
      postsZone,
      isLoading: false,
    }))
    .catch(error => console.log(error));
    //console.log( zoneId )
  }

  handleSaveZone = (zoneId) => {
    this.setState({
      isLoading: true,
    });
    let body = {
      'zone_id': parseInt(zoneId),
      'post_ids': this.state.postsZone.map(post=>post.ID)
    };

    fetch(`${Constants.apiUrl}zoninator/v1/zones/${zoneId}/posts/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      }, 
      body: JSON.stringify( body )
    })
    .then( response => this.setState({
      isLoading: false,
    }))
    .catch(error => console.log(error))
  }

  fetchMediaItems = () => {
    this.setState({
      isLoading: true,
    }); 
    //this.toggleLoading();
    let search = ('' === this.state.searchItem) ?
      '' : `&search=${this.state.searchItem}`;
    let url = `${Constants.apiUrl}wp/v2/media/?per_page=60&media_type=image${search}`;
    fetch(url, {
        headers: {
            authorization: `Bearer ${this.state.token}`,
        }, 
      })
    .then(response => response.json())
    .then(mediaItems => {
        this.setState({ 
          mediaItems,
          isLoading: false, 
        });
    } )
    .catch(error => console.log(error))
  }

  fetchMedia = (mediaId) => {
    fetch( `${Constants.apiUrl}wp/v2/media/${mediaId}` )
      .then(res => res.json())
      .then((responseJson) => {
          this.setState({ postFeaturedMedia: responseJson })
      })
      .catch(error => console.log(error))
  }

  fetchTerm = (taxonomy, id) => {
    fetch( `${Constants.apiUrl}wp/v2/${taxonomy}/${id}` )
    .then( res => res.json() )
    .then((responseJson)=>{
      return responseJson
    })
    console.log('taxonomy: ' + taxonomy + ' id: ' + id)
  }

  /* fetchPostCats = (cats) =>  {
    let updatedCats = []
    cats.map(cat => {
      let foundCat = this.state.categories.find(c => c.id===cat);
      if (undefined === foundCat) {
        updatedCats.push(foundCat.name);
      } else {
        //updatedCats.push('Cat ' + cat);
        let url = `${Constants.apiUrl}wp/v2/categories/${cat}`;

        fetch( url )
        .then(res => res.json())
        .then((cat) => { 
          //updatedCats.push(cat.name);
          //let stateCategories = this.state.categories;
          //let found = this.state.categories.find(c => c.id===cat.id);
          if (undefined === this.state.categories.find(c => c.id===cat.id)) {
            this.setState(prevState => {categories: prevState.categories.push(cat)})
          }
        })
        .catch(error => console.log(error))
      }
    })
    return this.state.categories;
    cats.map(cat => {
      return <span>{cat}, </span>
    })} 
    cats.map(cat =>
      fetch( `${Constants.apiUrl}wp/v2/categories/${cat}` )
      .then(res => res.json())
      .then((cat) => { 
        return <span>{cat.name}</span>
              //console.log(cat)
      })
      .catch(error => console.log(error))
    )
  } */

  fetchPostTags = (tagId) => {
    fetch( `${Constants.apiUrl}wp/v2/tags/${tagId}` )
      .then(res => res.json())
      .then((tag) => { 
        return tag ;
        //console.log(tag)
      })
      .catch(error => console.log(error))
  }

  handleSelectPost = (postId) => {
    let post = this.state.posts.filter(
      item => item.id === postId
    )[0];
    let contentBlock = htmlToDraft(
        post.content.rendered
    );
    let postContentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    let postEditorState = EditorState.createWithContent(
        postContentState
    );
    
    let postFeaturedMediaId = this.state.posts.find(
      post => post.id === postId
    ).featured_media;



    let postFeaturedMedia = this.state.mediaItems.find(
      mediaItem => mediaItem.id === postFeaturedMediaId
    );
    if (undefined===postFeaturedMedia) {
      this.fetchMedia( postFeaturedMediaId )
    }
    


    this.setState({ 
      postId,
      postDate: post.date,
      postColgado: post.colgado,
      postTitle: this.replaceAll( post.title.rendered ),
      postExcerpt: this.replaceAll( post.excerpt.rendered ),
      postEditorState: postEditorState,
      postFeaturedMedia: postFeaturedMedia,
      saveMessage: false,
      showWindow: 'PostEditor',
      postRedactor: post.redactor,
      postCategories: post.categories,
      postStatus: post.status,
      searchCategory: '',
      showCategories: false,
      showTags: false,
      searchTag: '',
      postTags: post.tags,
      postAuthor: post.author,
      showFeaturedBox: true,
      showStatus: true,
    });
  }

  handleDateChange = (date) => {
    this.setState({
        postDate: date
    });
  }
  handleDateBeforeChange = (date) => {
    this.setState({
        dateBefore: date
    });
  }
  handleDateAfterChange = (date) => {
    this.setState({
        dateAfter: date
    });
  }

  handleSelect = (event) => {
    let key = event.target.name;
    let terms = this.state[key];
    let index;
    if (event.target.checked) {
        terms.push(+event.target.value);
    } else {
        index = terms.indexOf(+event.target.value)
        terms.splice(index, 1);
    }
    terms.sort(); 
    this.setState({ [key]: terms });
  }

  replaceAll = (str) => {
    var mapObj = Constants.stringReplacement;
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
  }

  handleUploadImage = (event) => {
    this.setState({
      isLoading: true,
    }); 
    var data = new FormData();
    data.append('file', event.target.files[0])

    fetch(`${Constants.apiUrl}wp/v2/media`, {
      method: 'post',
      headers: {
        authorization: `Bearer ${this.state.token}`,
      },
      body: data
    })
    .then( this.fetchMediaItems )
    .catch(error => console.log(error))
  }

  updatePosts = (post) => {
    this.setState(state => {
      const posts = state.posts.map(item => {
        return (item.id === post.id) ? post: item;
      });

      return { 
        posts, 
      };
    });
  }

  newPost = () => {
    this.setState({
      postColgado: '',
      //postCategories: [],
      postExcerpt: '',
      postFeaturedMedia: false,
      postId: false,
      //postRedactor: '',
      postTitle: '',
      /* postAuthor: this.state.users.filter(
        user => user.name === this.state.userName
        )[0].id, */
      postEditorState: EditorState.createEmpty(),
      postContent: '',
      //postStatus: 'published',
      searchCategory: '',
      searchTag: '',
      showFeaturedBox: false,
      showStatus: false,
      showWindow: 'PostEditor',
    });
  }

  toggleLoading = () => {
    this.setState( (prevState) => {
      return {isLoading: ! prevState.isLoading}
    });
  }

  handleAddPost = (event) => {
    const newPost = this.state.posts.filter(
      post => post.id===parseInt(event.target.id)
    )[0];
    const newpostZone = {
      ID: newPost.id,
      guid: newPost.guid.rendered,
      post_content: newPost.content.rendered,
      post_date: newPost.date,
      post_excerpt: newPost.excerpt.rendered,
      post_status: newPost.status,
      post_title: newPost.title.rendered
    }

    this.setState({
      postsZone: [newpostZone, ...this.state.postsZone]
    });
  }

  handleFilterClear = () => {
    console.log('borrar filtros')
    this.setState({
      categorySelected: '0',
      dateAfter: '',
      dateBefore: '',
      tagSelected: '0'
    })
  }

  handleChange = (event) => {
    let change = {}
    change[event.target.name] = event.target.value;
    this.setState(change);
    if ( event.target.name === 'zoneSelected' ) {
      this.fetchPostsZone(event.target.value);
    }
  }

  handleSavePost = () => {
    let postId = this.state.postId ? this.state.postId : '';
    let url = `${Constants.apiUrl}wp/v2/posts/${postId}`;
    

    let post = {
        title: this.state.postTitle,
        excerpt: this.state.postExcerpt,
        content: this.state.postContent,
        author: this.state.postAuthor,
        redactor: this.state.postRedactor,
        publicador: this.state.users.filter(
            user => user.name === this.state.userName
        )[0].id,
        date: this.state.postDate,
        status: this.state.postStatus,
        colgado: this.state.postColgado,
        categories: this.state.postCategories,
        tags: this.state.postTags,
        featured_media: this.state.mediaSelected ? this.state.mediaSelected : 0,
    }

    this.setState({
      isLoading: true,
    });

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      },
      body:JSON.stringify( post )
    })
    .then( response => response.json() )
    .then( this.toggleLoading() )
    .then( post => {
        this.setState({
            posts: this.state.posts,
            postId: post.id,
            saveMessage: 'Entrada correctamente guardada'
        });
        this.updatePosts(post);
        this.toggleLoading();
    })
    .catch ( 
        console.log('error'),
        this.toggleLoading()
    )
  }

  handleTrashPosts = () => {
    this.setState({
      isLoading: true,
    }); 

    const urls = this.state.selectedPosts.map(
      postId => `${Constants.apiUrl}wp/v2/posts/${postId}` 
    );

    const requests = urls.map(url =>
      fetch(url, {
        method: 'delete',
        headers: {'Authorization': `Bearer ${this.state.token}`}
      })
      .then(response => response.json())
    );

    Promise.all(requests)
    .then(
      responses => responses.forEach( 
        res => console.log(res.length)
    ))
    /* this.toggleLoading();
    Promise.all(this.state.selectedPosts.map(postId => {
      let url = `${Constants.apiUrl}wp/v2/posts/${postId}`;
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
      })
    }))
    .then(
      this.toggleLoading()
    ) */
    /* this.toggleLoading();
    this.state.selectedPosts.map(postId => {
      this.setState(prevState => ({
        selectedPosts: prevState.selectedPosts.filter(post=>post.id!==postId)
      }));
      let url = `${Constants.apiUrl}wp/v2/posts/${postId}`;
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
      })
      //.then()
      //console.log(postId);
    });
    this.setState({selectedPosts: []})
    this.toggleLoading(); */
  }
  
  handleToggleBoxShow = event => {
    let key = event.target.dataset.key;
    let value = ! this.state[key]
    this.setState({[key] : value});
  }
  handleUpdateZonePosts = (postsZone) => {
    this.setState({ postsZone })
  } 

  zonesEdit = () => {
    this.setState({
      showWindow: 'ZoneEditor',
    })
  }

  render() {
    return (
      <Layout 
        isLoading={this.state.isLoading}
      >
        {
          !this.state.token && 
          <Login 
            userName={this.state.userName}
            userPass={this.state.userPass}
            signupMessage={this.state.signupMessage}
            handleChange={this.handleChange}
            fetchToken={this.fetchToken}
          />
        }
        {
          this.state.token && 
          this.state.showWindow==='PostTable' &&
          <PostTable 
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            dateAfter={this.state.dateAfter}
            dateBefore={this.state.dateBefore}
            fetchPosts={this.fetchPosts}
            //fetchPostCats={this.fetchPostCats}
            //fetchTag={this.fetchTag}
            handleDateBeforeChange={this.handleDateBeforeChange}
            handleDateAfterChange={this.handleDateAfterChange}
            handleChange={this.handleChange}
            handleFilterClear={this.handleFilterClear}
            handleSelect={this.handleSelect}
            handleSelectPost={this.handleSelectPost}
            handleTrashPosts={this.handleTrashPosts}
            months={this.state.months}
            newPost={this.newPost}
            tags={this.state.tags}
            tagSelected={this.state.tagSelected}
            postsTableHeadFields={this.state.postsTableHeadFields}
            posts={this.state.posts}
            replaceAll={this.replaceAll}
            selectedPosts={this.state.selectedPosts}
            status={this.state.status}
            statusSelected={this.state.statusSelected}
            users={this.state.users}
            zonesEdit={this.zonesEdit}
          />
        }
        {
          this.state.token && this.state.showWindow==='PostEditor' &&
          <PostEditor
            categories={this.state.categories}
            fetchMediaItems={this.fetchMediaItems}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            handleClose={this.handleClose}
            handleContentChange={this.handleContentChange}
            handleDateChange={this.handleDateChange}
            handleSavePost={this.handleSavePost}
            handleSelect={this.handleSelect}
            handleShow={this.handleShow}
            postId={this.state.postId}
            posts={this.state.posts}
            tags={this.state.tags}
            users={this.state.users}
            userName={this.state.userName}
            mediaItems={this.state.mediaItems}
            postAuthor={this.state.postAuthor}
            postCategories={this.state.postCategories}
            postColgado={this.state.postColgado}
            postDate={this.state.postDate}
            postExcerpt={this.state.postExcerpt}
            postEditorState={this.state.postEditorState}
            postFeaturedMedia={this.state.postFeaturedMedia}
            postRedactor={this.state.postRedactor}
            postStatus={this.state.postStatus}
            postTitle={this.state.postTitle}
            postTags={this.state.postTags}
            searchItem={this.searchItem}
            toggleLoading={this.toggleLoading}
            //selectImageText={this.state.selectImageText}
            saveMessage={this.state.mediaMessage}
            searchTag={this.state.searchTag}
            searchCategory={this.state.searchCategory}
            showFeaturedBox={this.state.showFeaturedBox}
            showStatus={this.state.showStatus}
            showTags={this.state.showTags}
            showCategories={this.state.showCategories}
            handleToggleBoxShow={this.handleToggleBoxShow}
            token={this.state.token}
            updatePosts={this.updatePosts}
          />
        }
        {
          this.state.token && this.state.showWindow==='MediaLibrary' &&
          <MediaLibrary 
            token={this.state.token}
            fetchMediaItems={this.fetchMediaItems}
            fetchMedia={this.fetchMedia}
            saveMessage={this.state.saveMessage}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            //handleConfirmItem={this.handleConfirmItem}
            handleFileSelect={this.handleFileSelect}
            handleMediaSave={this.handleMediaSave}
            handleUploadImage={this.handleUploadImage}
            mediaItems={this.state.mediaItems}
            mediaCaption={this.state.mediaCaption}
            handleShow={this.handleShow}
            postFeaturedMedia={this.state.postFeaturedMedia}
            searchItem={this.state.searchItem}
            mediaSelected={this.state.mediaSelected}
            imagenDestacada={this.state.imagenDestacada}
          />
        }
        {
          this.state.token && this.state.showWindow==='ZoneEditor' &&
          <ZoneEditor 
            posts={this.state.posts}
            postsZone={this.state.postsZone}
            zones={this.state.zones}
            replaceAll={this.replaceAll}
            zoneSelected={this.state.zoneSelected}
            handleShow={this.handleShow}
            handleChange={this.handleChange}
            handleAddPost={this.handleAddPost}
            handleSaveZone={this.handleSaveZone}
            handleUpdateZonePosts={this.handleUpdateZonePosts}
          />
        }
      </Layout>
    );
  }
}

export default App;
