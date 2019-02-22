import React, { Component, Fragment } from 'react';

//import TimePicker from 'react-time-picker';
//import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';


import {
    ContentState, 
    Editor, 
    EditorState, 
    RichUtils, 
} from 'draft-js';
import RichEditor from './RichEditor';
//import BlockStyleToolbar, { getBlockStyle } from './blockStyles/BlockStyleToolbar';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { stateToHTML } from "draft-js-export-html";

import * as Constants from '../assets/Constants';

import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    withStyles,
    FormControl,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import styles from '../styles/Styles';
import PostBox from './PostBox';
import PostBoxSelect from './PostBoxSelect';
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
            
            //token: this.props.token,
            //postId: this.props.postId,
            postColgado: this.props.post.colgado,
            postTitle: this.props.post.title.rendered,
            postExcerpt: this.props.post.excerpt.rendered.replace(/(\r\n|\n|\r|<[^>]*>)/gm, ''),
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent()),
            //status: Constants.status,
            postStatus: this.props.post.status,
            postCategories:this.props.post.categories,
            postDate: this.props.post.date,
            processing: false,
            loading: false,
            messageImage: '',
            messagePost: '',
        };
    }

    handleChange = event => {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }
    
    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    onContentChange = editorState => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        }); 
    }

    handleUpdatePost = () => {
        this.setState({
            processing: true,
            messagePost: 'Procesando...'
        });
        fetch(Constants.apiUrl + 'wp/v2/posts/' + this.props.post.id, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body:JSON.stringify({
                title: this.state.postTitle,
                content: this.state.editorContentHtml,
                excerpt: this.state.postExcerpt,
                status: this.state.postStatus,
                colgado: this.state.postColgado,
            })
        })
        .then(response => response.json())
        .then(() => this.setState({
            processing: false,
            messagePost: 'Artículo guardado correctamente'
        }))
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.postEditor}>
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
                            categories={this.props.categories}
                            handleChange={this.handleChange}
                            postDate={this.state.postDate}
                            postFeaturedImage={this.props.postFeaturedImage}
                            handleFeaturedImageClick={this.handleFeaturedImageClick}
                            loading={this.state.loading}
                            message={this.state.messageImage}
                            onClick1={this.props.handleShowMediaLibrary}
                            onClick2={this.handleUpdatePost}
                        />

                        <PostBoxSelect
                            title='Estado'
                            multiple={false}
                            value={this.state.postStatus}
                            handleChange={this.handleChange}
                            name='postStatus'
                            items={this.props.status}
                        />
                        
                        <PostBoxSelect
                            title='Categoría(s)'
                            multiple={true}
                            value={this.state.postCategories}
                            handleChange={this.handleChange}
                            name='postCategories'
                            items={this.props.categories}
                        />

                        <PostBox
                            postFeaturedImage={this.props.postFeaturedImage}
                            handleFeaturedImageClick={this.handleFeaturedImageClick}
                            loading={this.state.loading}
                            message={this.state.messageImage}
                            onClick1={this.props.handleShowMediaLibrary}
                            title='Imagen destacada'
                        />

                        <PostBox 
                            onClick1={this.props.handleClose}
                            onClick2={this.handleUpdatePost}
                            disabledButtons={this.state.processing}
                            message={this.state.messagePost}
                        />
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(PostEditor);