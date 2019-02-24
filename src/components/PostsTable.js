import React from 'react';
import PostRow from './PostRow';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles,
} from '@material-ui/core';
import styles from '../styles/Styles';
import Loading from './Loading';
import PostTableNavBar from './PostTableNavBar';

const PostsTable = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <PostTableNavBar
                categories = {props.categories}
                categoriesSelected = {props.categoriesSelected}
                tags = {props.tags}
                tagsSelected = {props.tagsSelected}
                handleChange = {props.handleChange}
                status = {props.status}
                statusSelected={props.statusSelected}
                fetchPosts={props.fetchPosts}
                newPost = {props.newPost}
            />
            {
                ! props.post &&
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Autor</TableCell>
                            <TableCell>Categorías</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        props.posts.length > 0 &&    
                        <TableBody>
                            {props.posts.map(post => (
                                <PostRow 
                                    post={post}
                                    users={props.users}
                                    categories={props.categories}
                                    key={post.id}
                                    handleClick={() => props.fetchPost(post)}
                                />
                            ))}
                        </TableBody>
                    }
                </Table>
            }
            {
                props.loadingPosts &&
                <Loading />
            }
        </div>
    );
}


PostsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsTable);