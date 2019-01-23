import React, { Component } from 'react';
import {ContentState, Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';


import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
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

        this.state = {
            editorState: editorState
        };
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
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    
    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    
    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    onChange = (editorState) => {
        this.setState({
            editorState
        }); 
    }

    render() {
        return(
            <div className="editorContainer">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={8}></Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" color="primary" onClick={this.props.handleClose}>
                            Cerrar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" color="primary" onClick={this.props.handleClose}>
                            Cerrar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                </Grid>
                <button onClick={this.onUnderlineClick}>U</button>
                <button onClick={this.onBoldClick}><b>B</b></button>
                <button onClick={this.onItalicClick}><em>I</em></button>
                <div className="editors">
                    <Editor 
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange= { this.onChange }
                    />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PostEditor);