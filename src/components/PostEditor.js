import React, { Component, Fragment } from 'react';
import {
    ContentState, 
    Editor, 
    EditorState, 
    RichUtils, 
} from 'draft-js';
import BlockStyleToolbar, { getBlockStyle } from './blockStyles/BlockStyleToolbar';
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


class PostEditor extends Component {
    
    constructor(props) {
        super(props);
        let editorState;
        if (this.props.postContent.content.rendered.trim() !== '') {
            const processedHTML = DraftPasteProcessor.processHTML(this.props.postContent.content.rendered);
            const contentState = ContentState.createFromBlockArray(processedHTML);
            //move focus to the end. 
            editorState = EditorState.createWithContent(contentState);
            //editorState = EditorState.moveFocusToEnd(editorState);
        }
        else {
            editorState = EditorState.createEmpty();
        }

        this.state = {
            
            token: this.props.token,
            postId: this.props.postId,
            postColgado: this.props.postContent.colgado,
            postTitle: this.props.postContent.title.rendered,
            postExcerpt: this.props.postContent.excerpt.rendered,
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent()),
            status: Constants.status,
            postStatus: this.props.postContent.status,
            postCategories:this.props.postContent.categories,
            postDate: this.props.postContent.date,
            processing: false,
            loading: false,
            messageImage: '',
            messagePost: '',
        };
    }

    componentDidMount() {
        this.fetchFeaturedImage(this.props.postContent.featured_media)
    }

    fetchFeaturedImage = (imageId) => {
        this.setState({
            messageImage: 'Cargando...'
        });
        fetch(Constants.apiUrl + 'wp/v2/media/' + imageId, {
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
                        messageImage: '',
                    })
                });
            } else {
                this.setState({
                    messageImage: 'Error cargando la imagen'
                });
              //console.log('ack failed', response.statusText)
            }
          })
          .catch((ex) => {
            this.setState({
                messageImage: 'Error cargando la imagen'
            });
            //throw new Error('fetch failed' + ex)
          });
    }

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    
	onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
	};

	onBoldClick = event => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
	};

	onItalicClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};

	toggleBlockType = blockType => {
		this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
	};

    onChange = editorState => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        }); 
    }

    handleChange = event => {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }

    handleUpdatePost = () => {
        this.setState({
            processing: true,
            messagePost: 'Procesando...'
        });
        fetch(Constants.apiUrl + 'wp/v2/posts/' + this.state.postId, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
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
                        
                        <div className='contentWrap'>
                            <div className='toolbar'>
                                <BlockStyleToolbar 
                                    editorState={this.state.editorState}
                                    onToggle={this.toggleBlockType}
                                />
                                <button className="styleButton" onClick={this.onUnderlineClick}>
                                    U
                                </button>
                                <button className="styleButton" onClick={this.onBoldClick}>
                                    <b>B</b>
                                </button>
                                <button className="styleButton" onClick={this.onItalicClick}>
                                    <em>I</em>
                                </button>
                            </div>
                            <div className='editorContainer content'>
                                <Editor 
                                    blockStyleFn={getBlockStyle}
                                    editorState={this.state.editorState}
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange= { this.onChange }
                                />
                            </div>
                        </div>                    
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card className={classes.sideEditorInput}>
                            <CardContent>

                                <PostBoxSelect
                                    title='Estado'
                                    multiple={false}
                                    value={this.state.postStatus}
                                    handleChange={this.handleChange}
                                    name='postStatus'
                                    items={this.state.status}
                                />

                                <TextField
                                    className={classes.sideEditorInput}
                                    label="Fecha / Hora"
                                    type="datetime-local"
                                    value={this.state.postDate}
                                />
                                <PostBoxSelect
                                    title='Categoría(s)'
                                    multiple={true}
                                    value={this.state.postCategories}
                                    handleChange={this.handleChange}
                                    name='postCategories'
                                    items={this.props.categories}
                                />
                            </CardContent>
                        </Card>

                        <PostBox
                            postFeaturedImage={this.state.postFeaturedImage}
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