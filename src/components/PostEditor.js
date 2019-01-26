import React, { Component } from 'react';
import {
    ContentState, 
    Editor, 
    EditorState, 
    RichUtils, 
} from 'draft-js';
import BlockStyleToolbar, { getBlockStyle } from './blockStyles/BlockStyleToolbar';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { stateToHTML } from "draft-js-export-html";


import {
    Button,
    Grid,
    TextField,
    withStyles,
} from '@material-ui/core';
import styles from '../styles/Styles';


class PostEditor extends Component {
    
    constructor(props) {
        super(props);
        let editorState;
        if (this.props.postContent.content.rendered.trim() !== '') {
            const processedHTML = DraftPasteProcessor.processHTML(this.props.postContent.content.rendered);
            const contentState = ContentState.createFromBlockArray(processedHTML);
            //move focus to the end. 
            editorState = EditorState.createWithContent(contentState);
            editorState = EditorState.moveFocusToEnd(editorState);
        }
        else {
            editorState = EditorState.createEmpty();
        }

        let editorExcerptState;
        if (this.props.postContent.excerpt.rendered.trim() !== '') {
            const processedExcerptHTML = DraftPasteProcessor.processHTML(this.props.postContent.excerpt.rendered);
            const excerptContentState = ContentState.createFromBlockArray(processedExcerptHTML);
            //move focus to the end. 
            editorExcerptState = EditorState.createWithContent(excerptContentState);
            editorExcerptState = EditorState.moveFocusToEnd(editorExcerptState);
        }
        else {
            editorExcerptState = EditorState.createEmpty();
        }

        this.state = {
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent()),

            editorExcerptState,
            editorExcerptHtml: stateToHTML(editorExcerptState.getCurrentContent()),

        };
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

    onChange = (editorState) => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        }); 
    }

    onExcerptChange = (editorExcerptState) => {
        this.setState({
            editorExcerptState,
            editorExcerptHtml: stateToHTML(editorExcerptState.getCurrentContent())
        }); 
    }

    render() {
        return(
            <div className='postEditor'>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={9}>
                        <div className='postItem'>
                            <TextField 
                                className='title'
                                label='Título'
                                variant='filled'
                                fullWidth
                                value={this.props.postContent.title.rendered}
                            />
                        </div>
                        <div className='editorContainer excerpt'>
                            <Editor 
                                editorState={this.state.editorExcerptState}
                                onChange= { this.onExcerptChange }
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
                        <Button variant="contained" color="primary" onClick={this.props.handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.props.handleClose}>
                            Cerrar
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(PostEditor);