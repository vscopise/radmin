import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import classes from './rich-editor.module.css';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichEditor = (props) => (
    <div className={classes.Editor}>
        <Editor 
            handlePastedText={() => false}
            editorState={props.editorState}
            onEditorStateChange={props.handleContentChange}
        />
    </div>
);

export default RichEditor;