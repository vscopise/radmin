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
            status: [
                {
                    id: 'publish',
                    name: 'Publicadas',
                },
                {
                    id: 'future',
                    name: 'Programadas',
                },
                {
                    id: 'draft',
                    name: 'Borradores',
                },
                {
                    id: 'pending',
                    name: 'Pendientes',
                },
                {
                    id: 'private',
                    name: 'Privadas',
                },
            ],
            categoriesSelected: [],
            statusSelected: [],
            categoriesIdSelected: [],
            statusIdSelected: [],
            loadingPosts: true,
            loadingUsers: true,
            loadingCategories: true,
            dateBefore: '',
            dateAfter: '',
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
        
        let statusToFetch = '';
        if (this.state.statusIdSelected.length > 0) {
            statusToFetch = '?status=' + this.state.statusIdSelected.join(',');
        } else {
            statusToFetch = '?status=publish';
        }
        
        let catToFetch = '';
        if (this.state.categoriesIdSelected.length > 0) {
            catToFetch = '&categories=' + this.state.categoriesIdSelected.join(',');
        }

        let dateBeforeToFetch = '';
        if (this.state.dateBefore !== '') {
            dateBeforeToFetch = '&before=' + this.state.dateBefore + 'T00:00:00';
        }

        let dateAfterToFetch = '';
        if (this.state.dateAfter !== '') {
            dateAfterToFetch = '&after=' + this.state.dateAfter + 'T00:00:00';
        }
        
        fetch(Constants.apiUrl + 'wp/v2/posts/' + statusToFetch + catToFetch + dateBeforeToFetch + dateAfterToFetch, {
            headers: new Headers({
                Authorization: `Bearer ${this.props.token}`
            }),
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
            categoriesSelected: event.target.value,
            categoriesIdSelected: event.target.value.map(selectedCat => this.state.categories.find(
                category => category.name === selectedCat
            ).id)
        })
    }

    handleStatusChange = event => {
        this.setState({
            statusSelected: event.target.value,
            statusIdSelected: event.target.value.map(selectedStatus => this.state.status.find(
                status => status.name === selectedStatus
            ).id)
        })
    }
    
    handleAfterDateChange = event => {
        this.setState({
            dateAfter: event.target.value
        })
    }

    handleBeforeDateChange = event => {
        this.setState({
            dateBefore: event.target.value
        })
    }

    render(){
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <PostTableNavBar
                categories={this.state.categories}
                status={this.state.status}
                categoriesSelected={this.state.categoriesSelected}
                statusSelected={this.state.statusSelected}
                handleCategoriesChange={this.handleCategoriesChange}
                handleStatusChange={this.handleStatusChange}
                fetchPosts={this.fetchPosts}
                handleAfterDateChange={this.handleAfterDateChange}
                handleBeforeDateChange={this.handleBeforeDateChange}
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