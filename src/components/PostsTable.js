import React, { Component } from 'react';
import PostRow from './PostRow';
import * as Constants from '../assets/Constants';
import PropTypes from 'prop-types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles,
} from '@material-ui/core';
import styles from '../styles/Styles';

class PostsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            post: false,
            users: [],
            categories: [],
            loadingPosts: true,
            loadingUsers: true,
            loadingCategories: true,
        };
    }

    componentDidMount() {
        this.fetch_users();
        this.fetch_categories();
        this.fetch_posts();
    }

    fetch_posts = () => {
        
        fetch(Constants.apiUrl + 'wp/v2/posts', {
            headers: {
                authorization: 'Bearer ' + this.props.token,
            }, 
            
          })
        .then(response => response.json())
        .then(posts => this.setState({
            posts: posts,
            loadingPosts: false
        }))
        .catch(error => console.log(error))
    }

    fetch_users = () => {
        fetch(Constants.apiUrl + 'wp/v2/users?per_page=99', {
            headers: {
                authorization: 'Bearer ' + this.props.token,
            }, 
          })
        .then(response => response.json())
        .then(users => this.setState({
            users: users,
            loadingUsers: false
        }))
        .catch(error => console.log(error))
    }

    fetch_categories = () => {
        fetch(Constants.apiUrl + 'wp/v2/categories?per_page=99', {
            headers: {
                authorization: 'Bearer ' + this.props.token,
            }, 
          })
        .then(response => response.json())
        .then(categories => this.setState({
            categories: categories,
            loadingCategories: false
        }))
        .catch(error => console.log(error))
    }

    fetch_post = (e) => {
        console.log('edit-post');
        this.setState({
            post: e.target
        })
    }

    render(){
        const { classes } = this.props;

        return (
          <Paper className={classes.root}>
            {
                ! this.state.post &&
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
                    ! this.state.loadingPost && 
                    ! this.state.loadingUsers && 
                    ! this.state.loadingCategories &&
                    <TableBody>
                        {this.state.posts.map(post => (
                            <PostRow 
                                post={post}
                                users={this.state.users}
                                categories={this.state.categories}
                                key={post.id}
                                handleClick={this.fetch_post}
                            />
                        ))}
                    </TableBody>
                }
                </Table>
            }
            {
                this.state.post &&
                <p>id</p>
            }
          </Paper>
        );
    }
    
}


PostsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsTable);