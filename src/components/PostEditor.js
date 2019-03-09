import React, { Component } from 'react';

import {
    ContentState, 
    //Editor, 
    EditorState, 
    //RichUtils, 
} from 'draft-js';
import RichEditor from './RichEditor';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { stateToHTML } from "draft-js-export-html";

import * as Constants from '../assets/Constants';

import {
    Grid,
    TextField,
    withStyles,
} from '@material-ui/core';
import styles from '../styles/Styles';
// import PostBox from './PostBox';
//import PostBoxSelect from './PostBoxSelect';
import PostEditorSide from './PostEditorSide';


class PostEditor extends Component {
    
    constructor(props) {
        super(props);
        let editorState;
        if (this.props.post.content.rendered.trim() !== '') {
            const processedHTML = DraftPasteProcessor.processHTML(this.props.post.content.rendered);
            const contentState = ContentState.createFromBlockArray(processedHTML);
            //move focus to the end. 
            editorState = EditorState.createWithContent(contentState);
            //editorState = EditorState.moveFocusToEnd(editorState);
        }
        else {
            editorState = EditorState.createEmpty();
        }

        this.state = {
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent()),
            //status: Constants.status,
            postColgado: this.props.post.colgado,
            postTitle: this.replaceAll(this.props.post.title.rendered, Constants.stringReplacement),
            postExcerpt: this.replaceAll(this.props.post.excerpt.rendered, Constants.stringReplacement),
            postStatus: this.props.post.status,

            postCategories:this.props.post.categories,
            postTags:this.props.post.tags,
            postDate: this.props.post.date,
            postFeaturedMedia: false,
            processing: false,
            loading: false,
            messageImage: '',
            //messagePost: '',
        };
    }

    componentDidMount() {
        this.fetchFeaturedImage();
    }

    handleChange = event => {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }
  
    onContentChange = editorState => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        }); 
    }

    replaceAll = (str, mapObj) => {
        var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    
        return str.replace(re, function(matched){
            return mapObj[matched.toLowerCase()];
        });
    }

    fetchFeaturedImage = () => {
        this.setState({ 
          isLoading: true, 
        //   postFeaturedImage: false
        })
        // if (this.props.post.featured_media) {
        if(!this.props.postFeaturedImage) {
        // if (!this.state.postFeaturedMedia) {
            fetch(Constants.apiUrl + 'wp/v2/media/' + this.props.post.featured_media)  
            .then((response) => {
                if(response.ok) {
                    response.json().then(image => {
                        this.setState({
                            postFeaturedImage: image,
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
        } else {
            this.setState({
                isLoading: false,
                postFeaturedImage: this.props.postFeaturedImage
            });
        }
    }

    handleUpdatePost = () => {
        this.setState({
            processing: true,
            messagePost: 'Procesando...'
        });
        //let FeaturedMedia = this.props.postFeaturedMedia;
        let postId = this.props.post.id ? this.props.post.id : '';
        let token = this.props.token;
        fetch(Constants.apiUrl + 'wp/v2/posts/' + postId, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body:JSON.stringify({
                title: this.state.postTitle,
                content: this.state.editorContentHtml,
                date: this.state.postDate,
                excerpt: this.state.postExcerpt,
                status: this.state.postStatus,
                //colgado: this.state.postColgado,
                categories: this.state.postCategories,
                tags: this.state.postTags,
                featured_media: this.state.postFeaturedImage.id
            })
        })
        .then(response => response.json())
        .then(() => this.setState({
            processing: false,
            postUpdated: true,
            messagePost: 'Artículo guardado correctamente'
        }))
        .then(this.props.fetchPosts)
      }

    render() {
        return (
            <div className={this.props.classes.postEditor}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={9}>
                        
                        <div className='postItem'>
                            <TextField 
                                className='colgado'
                                label='Colgado'
                                variant='filled'
                                fullWidth
                                value={this.state.postColgado}
                                onChange={this.handleChange}
                                name='postColgado'
                            />
                        </div>

                        <div className='postItem'>
                            <TextField 
                                className='title'
                                label='Título'
                                variant='filled'
                                fullWidth
                                value={this.state.postTitle}
                                onChange={this.handleChange}
                                name='postTitle'
                            />
                        </div>

                        <div className='editorContainer postItem'>
                            <TextField 
                                label='Copete'
                                fullWidth
                                multiline
                                value={this.state.postExcerpt}
                                onChange={this.handleChange}
                                name='postExcerpt'
                            />
                        </div>                        

                        <RichEditor 
                            editorState={this.state.editorState}
                            onContentChange={this.onContentChange}
                        />

                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <PostEditorSide
                            postStatus={this.state.postStatus}
                            status={this.props.status}
                            postCategories={this.state.postCategories}
                            postTags={this.state.postTags}
                            categories={this.props.categories}
                            tags={this.props.tags}
                            handleChange={this.handleChange}
                            postDate={this.state.postDate}
                            postFeaturedImage={this.state.postFeaturedImage}
                            handleFeaturedImageClick={this.handleFeaturedImageClick}
                            loading={this.state.loading}
                            processing={this.state.processing}
                            messagePost={this.state.messagePost}
                            handleShowMediaLibrary={this.props.handleShowMediaLibrary}
                            //onClick1={this.props.handleShowMediaLibrary}
                            handleUpdatePost={this.handleUpdatePost}
                            handleClose={this.props.handleClose}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(PostEditor);