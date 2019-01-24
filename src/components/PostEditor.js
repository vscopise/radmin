import React, { Component } from 'react';
import {
    ContentState, 
    Editor, 
    EditorState, 
    RichUtils, 
    convertToRaw 
} from 'draft-js';
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
    


    _onClick = (e) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
    }
    

    onChange = (editorState) => {
        this.setState({
            editorState
        }); 
    }

    render() {
        const styles = ['H2', 'BOLD', 'ITALIC', 'UNDERLINE', 'CODE'];
        const buttons = styles.map(style => {
          return <button key={style} onClick={this._onClick} name={style}>{style}</button>
        })
    
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
                <div className='toolbar'>
                  {buttons}
                </div>
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