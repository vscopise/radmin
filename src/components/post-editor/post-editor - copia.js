import React, { Component } from 'react';
import { 
    EditorState, 
    convertToRaw,
    ContentState,
 } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
//import DatePicker from 'react-datepicker';
import Datetime from 'react-datetime';
//import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';

import classes from './post-editor.module.css';
import * as Constants from '../../assets/constants';

import RichEditor from '../rich-editor/rich-editor';
import TextInput from '../text-input/text-input';
import Select from '../select/select';
import SelectTerm from '../select-term/select-term';
import CollapsedBox from '../collapsed-box/collapsed-box';
import MediaLibrary from '../media-library/media-library';
//import { updateLocale } from 'moment';

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postColgado: '',
            postTitle: '',
            postExcerpt: '',
            postContent: '',
            postRedactor: '',
            editorState: '',
            postCategories: [],
            searchCategory: '',
            showCategories: false,
            saveMessage: false,
            postTags: [],
            postId: false,
            postDate: '',
            postStatus: '',
            postAuthor: '',
            searchTag: '',
            showTags: false,
            showStatus: false,
            selectImageText: '',
            showFeaturedBox: '',
            //mediaItems: [],
            postImage: false,
            //featuredImage: post.featured_media ? this.fetchImage( post.featured_media ) : false,
            //featuredImage: this.fetchImage( post.featured_media ),
            featuredImage: false,
            featured_media : false,
            mediaSelected: false,
            //postImage: post.featured_media,
            searchItem: '',
            showWindow: 'PostTable',
        }

        var post = {};
        let postImage;
        let selectImageText;
        let featuredImage;

        if (this.props.postId) {
            let p = this.props.posts.filter(
                item => item.id === this.props.postId
            )[0];
            let showFeaturedBox = ( 0 === p.featured_media ) ? false : true;
            
            const contentBlock = htmlToDraft(p.content.rendered);

            let editorState;
    
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(
                    contentBlock.contentBlocks
                );
                editorState = EditorState.createWithContent(contentState);
            } else {
                editorState = EditorState.createEmpty();
            }

            this.setState({
                postColgado: p.colgado,
                postTitle: this.replaceAll(p.title.rendered, Constants.stringReplacement),
            });
            
            //let propPostImage = this.props.postImage;
            //let mediaItems = this.props.mediaItems;
            //postImage = post.featured_media;
            //featuredImage = this.fetchImage( post.featured_media );
            featuredImage = this.props.mediaItems.filter(
                item => item.id === post.featured_media
            )[0];

            if ( undefined === featuredImage ) {
                fetch( Constants.apiUrl + `wp/v2/media/${post.featured_media}` )
                .then(res => res.json())
                .then((responseJson) => {
                    featuredImage = responseJson
                    //this.setState({ featuredImage: responseJson })
                })
                .catch(error => console.log(error))
            }

            console.log( this.props.mediaItems.filter(
                item => item.id === post.featured_media
            )[0] );
            
            selectImageText = 'Cambiar imagen destacada';
            //showFeaturedBox = true;
        } else {
            var now = new Date();
            var postTime = now.toLocaleTimeString();
            var postDate = now.toISOString().slice(0,11);
            post = {
                status: 'draft',
                date: postDate + postTime,
                tags: [],
                categories: [1],
                content: {rendered: ''},
                title: {rendered: ''},
                excerpt: {rendered: ''},
                //featured_media: 0,
                featuredImage: false,
                author: this.props.users.filter(
                    user => user.name === this.props.userName
                )[0].id
            };
            postImage = false;
            selectImageText = 'Establecer imagen destacada';
            //showFeaturedBox = false;
        }

        /* let showFeaturedBox = ( 0 === post.featured_media ) ? false : true;

        const contentBlock = htmlToDraft(post.content.rendered);

        let editorState;

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            editorState = EditorState.createWithContent(contentState);
        } else {
            editorState = EditorState.createEmpty();
        } */
        

        /* this.state = {
            postColgado: post.colgado,
            postTitle: this.replaceAll(post.title.rendered, Constants.stringReplacement),
            postExcerpt: this.replaceAll(post.excerpt.rendered, Constants.stringReplacement),
            postContent: post.content.rendered,
            postRedactor: post.redactor,
            editorState,
            postCategories: post.categories,
            searchCategory: '',
            showCategories: false,
            saveMessage: false,
            postTags: post.tags,
            postId: post.id,
            postDate: post.date,
            postStatus: post.status,
            postAuthor: post.author,
            searchTag: '',
            showTags: false,
            showStatus: false,
            selectImageText,
            showFeaturedBox,
            postImage,
            featuredImage: false,
            featured_media : post.featured_media,
            mediaSelected: false,
            searchItem: '',
            showWindow: 'PostTable',

        } */
        require('moment/locale/es');
    }

    fetchImage = (mediaId) => {
        let featuredImage;
        featuredImage = this.props.mediaItems.filter(
            mediaItem => mediaItem.id === mediaId
        )[0];
        if ( undefined === featuredImage ) {
            fetch( Constants.apiUrl + `wp/v2/media/${mediaId}` )
            .then(res => res.json())
            .then((responseJson) => {
                //featuredImage = responseJson
                this.setState({ featuredImage: responseJson })
            })
            .catch(error => console.log(error))
        } else {
            this.setState({ featuredImage })
        }
        //return featuredMedia;
    }
    
    handleUploadImage = () => {
        this.props.toggleLoading();
        var data = new FormData();
        data.append('file', this.props.uploadFile)
    
        fetch(Constants.apiUrl + 'wp/v2/media', {
          method: 'post',
          headers: {
            authorization: 'Bearer ' + this.props.token,
          },
          body: data
        })
        .then(res => res.json())
        .then((responseJson) => {
            this.props.fetchMediaItems();
           }
        )
        .catch(error => console.log(error))
    }
    
    handleChange = event => {
        let change = {}
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    handleClick = event => {
        let click = {};
        click[event.target.dataset.name] = parseInt(event.target.dataset.key);
        this.setState(click);
    }

    handleSelect = event => {
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

    handleDateChange = (date) => {
        this.setState({
            postDate: date
        });
    }

    handleContentChange = (editorState) => {
        this.setState({
            editorState,
            postContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        });
    }

    handleShow = (e) => {
        let showWindow = e.target.dataset.window;
        this.setState({ 
          showWindow,
          mediaMessage: false,
        });
    }

    handleConfirmItem = (e) => {
        this.setState({ 
            postImage: parseInt(e.target.dataset.key),
            featured_media: this.props.mediaItems.find(
                item => item.id === parseInt(e.target.dataset.key)
            ).id,
            featuredImage: this.props.mediaItems.find(item => item.id === parseInt(e.target.dataset.key)),
            mediaMessage: 'Imagen seleccionada'
        });

        
    }

    toggleBoxShow = (event) => {
        let key = event.target.dataset.key;
        let value = ! this.state[key]
        this.setState({[key] : value});
    }

    replaceAll = (str, mapObj) => {
        var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    
        return str.replace(re, function(matched){
            return mapObj[matched.toLowerCase()];
        });
    }

    savePost = () => {
        this.props.toggleLoading();
        
        let postId = this.state.postId ? this.state.postId : '';
        let url = Constants.apiUrl + 'wp/v2/posts/' + postId;

        let post = {
            title: this.state.postTitle,
            excerpt: this.state.postExcerpt,
            content: this.state.postContent,
            author: this.state.postAuthor,
            redactor: this.state.postRedactor,
            publicador: this.props.users.filter(
                user => user.name === this.props.userName
            )[0].id,
            date: this.state.postDate,
            status: this.state.postStatus,
            colgado: this.state.postColgado,
            categories: this.state.postCategories,
            tags: this.state.postTags,
            featured_media: this.state.featured_media,
        }

        fetch(Constants.apiUrl + 'wp/v2/posts/' + postId, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${this.props.token}`
          },
          body:JSON.stringify( post )
        })
        .then( response => response.json() )
        .then( this.props.toggleLoading() )
        .then( post => {
            this.setState({
                posts: this.state.posts,
                postId: post.id,
                saveMessage: 'Entrada correctamente guardada'
            });
            this.props.updatePosts(post);
            this.props.toggleLoading();
        })
        .catch ( 
            console.log('error'),
            this.props.toggleLoading()
        )
    }

    /* handleMediaSelect = () => {
        let a = 0;
    } */

    render() {
        if ( this.state.showWindow ==='MediaLibrary' ) {
            return ( 
                <MediaLibrary 
                    token={this.props.token}
                    mediaItems={this.props.mediaItems}
                    mediaSelected={this.state.mediaSelected}
                    handleMediaSelect={this.handleMediaSelect}
                    postImage={this.state.postImage}
                    handleChange={this.props.handleChange}
                    handleClick={this.handleClick}
                    searchItem={this.props.searchItem}
                    toggleLoading={this.props.toggleLoading}
                    handleShow={this.handleShow}
                    handleConfirmItem={this.handleConfirmItem}
                    fetchMediaItems={this.props.fetchMediaItems}
                    handleFileSelect={this.props.handleFileSelect}
                    handleUploadImage={this.handleUploadImage}
                    uploadFile={this.props.uploadFile}
                    saveMessage={this.state.mediaMessage}
                /> 
            )
        } else {
            //let featuredMedia = {};
            //if ( undefined !== this.state.featured_media ) {
                /* featuredMedia = this.props.mediaItems.filter(
                    mediaItem => mediaItem.id === this.state.featured_media
                )[0]; */
                //this.fetchImage( this.state.featured_media )
            /* } else if ( undefined !== this.state.mediaSelected ) {
                featuredMedia = this.props.mediaItems.filter(
                    mediaItem => mediaItem.id === this.state.mediaSelected
                )[0]; */
            //}
            return (
                <div className={classes.PostEditor}>
                    <div className='column-main'>
                        <div className='column-box'>
                            <TextInput 
                                name='postColgado'
                                value={this.state.postColgado}
                                onChange={this.handleChange}
                                label='Colgado'
                            />
                            <TextInput 
                                name='postTitle'
                                value={this.state.postTitle}
                                onChange={this.handleChange}
                                label='Título'
                            />
                            <TextInput 
                                name='postExcerpt'
                                value={this.state.postExcerpt}
                                onChange={this.handleChange}
                                label='Extracto'
                            />
                            <RichEditor 
                                editorState={this.state.editorState}
                                handleContentChange={this.handleContentChange}
                            />
                            <TextInput 
                                name='postRedactor'
                                value={this.state.postRedactor}
                                onChange={this.handleChange}
                                label='Redactor'
                            />
                        </div>
                    </div>
                    <div className='column-side'>
                        <CollapsedBox
                            title='Categorías'
                            show={this.state.showCategories}
                            toggleShow={this.toggleBoxShow}
                        >
                            <SelectTerm
                                name='searchCategory'
                                searchTerm={this.state.searchCategory}
                                postTerms={this.state.postCategories}
                                terms={this.props.categories}
                                selectTerms='postCategories'
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                label='Buscar Categorias'
                            />
                        </CollapsedBox>
                        <CollapsedBox
                            title='Etiquetas'
                            show={this.state.showTags}
                            toggleShow={this.toggleBoxShow}
                        >
                            <SelectTerm
                                name='searchTag'
                                searchTerm={this.state.searchTag}
                                postTerms={this.state.postTags}
                                terms={this.props.tags}
                                selectTerms='postTags'
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                label='Buscar Etiquetas'
                            />
                        </CollapsedBox>
                        <CollapsedBox
                            title='Estado y visibilidad'
                            show={this.state.showStatus}
                            toggleShow={this.toggleBoxShow}
                        >
                            <Datetime 
                                value={this.state.postDate} 
                                onChange={this.handleDateChange}
                                dateFormat='D \d\e MMMM, YYYY'
                                className={classes.postDate} 
                            />
                            <Select 
                                label='Visibilidad' 
                                items={Constants.status} 
                                name='postStatus'
                                onChange={this.handleChange}
                                value={this.state.postStatus}
                            />
                            <Select
                                label='Autor'
                                items={this.props.users}
                                name='postAuthor'
                                onChange={this.handleChange}
                                value={this.state.postAuthor}
                            />
                        </CollapsedBox>
                        <CollapsedBox
                            title='Imagen destacada'
                            show={this.state.showFeaturedBox}
                            toggleShow={this.toggleBoxShow}
                        >
                        {
                            this.state.featuredImage  &&
                            <img 
                                src={this.state.featuredImage.media_details.sizes.full.source_url} 
                                alt={this.state.featuredImage.title.rendered} 
                            />
                        }
                        <button
                            className={['button', 'button-secondary'].join(' ')}
                            onClick={this.handleShow}
                            data-window='MediaLibrary'
                        >{this.state.selectImageText}</button>
                        </CollapsedBox>
                        <div className='column-box'>
                            <button 
                                className={['button', 'button-secondary'].join(' ')}
                                onClick={this.props.handleShow}
                                data-window='PostTable'
                            >Cerrar</button>
                            <button
                                className={['button', 'button-primary'].join(' ')}
                                onClick={this.savePost}
                            >
                                { this.props.postId ?
                                    'Actualizar' : 'Guardar'
                                }
                            </button>
                            {
                                this.state.saveMessage &&
                                <p>{this.state.saveMessage}</p>
                            }
                        </div>
                        
                    </div>
                </div>
            )
        }
    }
}

export default PostEditor;