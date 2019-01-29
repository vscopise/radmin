import React, { Component } from 'react';
import PostRow from './PostRow';
import * as Constants from '../assets/Constants';
import PropTypes from 'prop-types';
import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    withStyles,
    FormControl,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core';
import styles from '../styles/Styles';
import PostEditor from './PostEditor';
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
            loadingPosts: true
        });
        let catToFetch = '';
        let varCategoriesSelected = this.state.categoriesSelected;
        this.state.categoriesSelected.map(
            catSelected => catToFetch + catSelected
        );
        let url = Constants.apiUrl + 'wp/v2/posts' + catToFetch;
        fetch(Constants.apiUrl + 'wp/v2/posts' + catToFetch, {
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
            categoriesSelected: event.target.value
        })
        /*this.setState({ 
            categoriesSelected: event.target.value.map(selectedCat => this.state.categories.find(
                category => category.name === selectedCat
            ))
        })*/
        /*this.setState({ 
            categoriesSelected: [
                ...this.state.categoriesSelected, 
                event.target.value
            ]
        })*/
          
        /*this.setState({ 
            categoriesSelected: event.target.value.map(selectedCat => this.state.categories.find(
                category => category.name === selectedCat
            ))*/
            /*categoriesSelected: this.state.categories.find(
                category => category.name === event.target.value
            ).term_id */
            //categoriesSelected: event.target.value 
        /*
        this.props.categories.find(
                category => category.slug === pathCatName
            ).term_id

        this.state.categories.find(
                category => category.name === event.target.value
            ).term_id
        */
        
       // });
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