import React from 'react';
import classes from './posts-table-title-cell.module.css';


const postsTableTitleCell = (props) => (
    <td 
        onClick={()=>{props.handleSelectPost(props.postId)}}
        className={classes.Link}
    >{props.title}</td>
);

export default postsTableTitleCell;