import React from 'react';
import PropTypes from 'prop-types';
import {
    TableCell,
    TableRow,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';

const PostRow = (props) => {
    const { classes } = props;

    return (
        <TableRow 
            key={props.post.id} 
            className={classes.postRow}
            onClick={e => props.handleClick(e)}
        >
            <TableCell component="th" scope="row" >
                <div 
                    dangerouslySetInnerHTML={{__html: props.post.title.rendered}}
                />
            </TableCell>
            <TableCell>
                {props.users.find(
                    user => user.id === props.post.author
                ).name}
            </TableCell>
            <TableCell>
                {props.post.categories.map(cat => (
                    <span 
                        key={cat}
                        className={'cat'}
                        dangerouslySetInnerHTML={{
                            __html: props.categories.find (
                                        category => category.id === cat
                                    ).name
                        }}
                    />
                ))}
            </TableCell>
            <TableCell align="right">{props.post.date}</TableCell>
        </TableRow>
    )   
}  

PostRow.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PostRow);
  