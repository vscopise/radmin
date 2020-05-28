import React from 'react';
import classes from './checkbox.module.css';

const checkbox = (props) => (
    <div className={classes.checkbox}>
        <input 
            type='checkbox' 
            name={props.name}
            checked={props.value} 
            onChange={props.handleSelect}
            value={props.id}
            id={props.id} 
        />
        <label htmlFor={props.id}>{props.label}</label>
    </div>
);

export default checkbox;