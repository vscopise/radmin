import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import classes from './post-table-control-text.module.css';

const postsTableControlText = (props) => (
    <input 
        type='text' 
        name={'yearSelected'}
        className={classes.Text} 
        onChange={props.handleChange} 
        value={props.value}
    />
        
);

export default postsTableControlText;