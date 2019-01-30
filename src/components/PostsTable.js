import React, { Component } from 'react';
import PostRow from './PostRow';
import * as Constants from '../assets/Constants';
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

class PostsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            users: [],
            categories: [],
            categoriesSelected: [],
            categoriesIdSelected: [],
            loadingPosts: true,
            loadingUsers: true,
            loadingCategories: true,
        };
    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchCategories();
        this.fetchPosts();
    }

    fetchPosts = () => {
        this.setState({
            loadingPosts: true,
            posts: [],
        });
        let catToFetch = '';
        if (this.state.categoriesIdSelected.length>0) {
            catToFetch = '?categories=' + this.state.categoriesIdSelected.join(',');
        }
        fetch(Constants.apiUrl + 'wp/v2/posts/' + catToFetch, {
            headers: {
                Accept: 'applicqtion/json',
                    'Content-Type': 'application/json',
                },
                Authorization: 'Bearer ' + this.props.token,
            })   
            //headers: { 
            //    'Authorization': `Bearer ${this.props.token}` 
            //},
            /*headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${this.props.token}` 
            }),*/
          
        .then(response => response.json())
        .then(posts => this.setState({
            posts: posts,
            loadingPosts: false
        }))
        .catch(error => console.log(error))
    }

    fetchUsers = () => {
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

    fetchCategories = () => {
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

    handleCategoriesChange = event => {
        this.setState({
            categoriesSelected: event.target.value,
            categoriesIdSelected: event.target.value.map(selectedCat => this.state.categories.find(
                category => category.name === selectedCat
            ).id)
        })
    }

    render(){
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <PostTableNavBar
                categories={this.state.categories}
                categoriesSelected={this.state.categoriesSelected}
                handleCategoriesChange={this.handleCategoriesChange}
                fetchPosts={this.fetchPosts}
            />
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
                        ! ( this.state.loadingPosts ||
                            this.state.loadingUsers ||
                            this.state.loadingCategories ) &&
                    <TableBody>
                        {this.state.posts.map(post => (
                            <PostRow 
                                post={post}
                                users={this.state.users}
                                categories={this.state.categories}
                                key={post.id}
                                handleClick={() => this.props.fetchPost(post)}
                            />
                        ))}
                    </TableBody>
                }
                </Table>
            }
            {
                ( this.state.loadingPosts ||
                this.state.loadingUsers ||
                this.state.loadingCategories ) &&
                <Loading />
            }
          </div>
        );
    }
    
}


PostsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsTable);