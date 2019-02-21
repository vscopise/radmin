import React, { Fragment }  from 'react';
import {
    Button,
    Card,
    CardContent,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    withStyles,
} from '@material-ui/core';
import PostBox from './PostBox';
/*const styles = {
    sideEditorInput: {
        width: '100%',
        marginBottom: 20,
    },
      PostEditorSide: {

    }
}*/
import styles from '../styles/Styles';

import PostBoxSelect from './PostBoxSelect';



const PostEditorSide = (props) => (
    <div className={props.classes.PostEditorSide}>
        <Card className={props.classes.sideEditorInput}>
            <CardContent>

            <PostBoxSelect
                title='Estado'
                multiple={false}
                value={props.postStatus}
                handleChange={props.handleChange}
                name='postStatus'
                items={props.status}
            />
                        
            <PostBoxSelect
                title='Categoría(s)'
                multiple={true}
                value={props.postCategories}
                handleChange={props.handleChange}
                name='postCategories'
                items={props.categories}
            />

            <TextField
                id="datetime-local"
                value={props.postDate}
                className={props.classes.sideEditorInput}
                label="Fecha / Hora"e
                type="datetime-local"
               // defaultValue={props.postDate}
                onChange={props.handleChange}
                name="postDate"
            />

            <PostBox
                postFeaturedImage={props.postFeaturedImage}
                handleFeaturedImageClick={props.handleFeaturedImageClick}
                loading={props.loading}
                message={props.messageImage}
                onClick1={props.handleShowMediaLibrary}
                title='Imagen destacada'
            />

            

            </CardContent>
        </Card>
    </div>
)
export default withStyles(styles)(PostEditorSide);
