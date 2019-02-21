import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Typography,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';

const PostEditorSide = (props) => (
    <div className={props.classes.PostEditorSide}>
        <Card className={classes.sideEditorInput}>
            <CardContent>

                <PostBoxSelect
                    title='Estado'
                    multiple={false}
                    value={this.state.postStatus}
                    handleChange={this.handleChange}
                    name='postStatus'
                    items={this.props.status}
                />

                <TextField
                    id="datetime-local"
                    className={classes.sideEditorInput}
                    label="Fecha / Hora"
                    type="datetime-local"
                    defaultValue={this.state.postDate}
                    onChange={this.handleChange}
                    name="postDate"
                />

                <PostBoxSelect
                    title='Categoría(s)'
                    multiple={true}
                    value={this.state.postCategories}
                    handleChange={this.props.handleChange}
                    name='postCategories'
                    items={this.props.categories}
                />
            </CardContent>
        </Card>
    </div>
)
export default withStyles(styles)(PostEditorSide);
