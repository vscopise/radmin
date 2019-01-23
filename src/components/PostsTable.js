import React, { Component } from 'react';
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
            users: [],
            categories: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this.fetch_posts();
        this.fetch_users();
        this.fetch_categories();
        this.setState({isLoading: false});
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
        }))
        .catch(error => console.log(error))
    }

    render(){
        const { classes } = this.props;

        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Autor</TableCell>
                  <TableCell align="right">Categorías</TableCell>
                  <TableCell align="right">Fecha</TableCell>
                </TableRow>
              </TableHead>
              {
                ! this.state.isLoading &&
                <TableBody>
                    {this.state.posts.map(post => (
                    <TableRow key={post.id}>
                        <TableCell component="th" scope="row" >
                            <div 
                                dangerouslySetInnerHTML={{__html: post.title.rendered}}
                            />
                        </TableCell>
                        <TableCell>
                            {
                                this.state.users.find(
                                    user => user.id === post.author
                                ).name
                            }
                        </TableCell>
                        <TableCell>
                            {post.categories.map(cat => (
                                <span>
                                    ll
                                    {
                                        /*this.state.categories.find (
                                            category => category.id === cat
                                        ).name*/
                                        //cat
                                    }
                                </span>
                            ))}
                        </TableCell>
                        <TableCell align="right">{post.date}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              }
            </Table>
          </Paper>
        );
    }
    
}


PostsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsTable);