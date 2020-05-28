import React from 'react';
import classes from './select.module.css';

const select = (props) => (
    <div className={classes.select}>
        <span>{props.label}</span>
        <select 
            name={props.name} 
            onChange={props.onChange} 
            value={props.value}
        >
            {props.items.map(item=>(
                <option 
                    key={item.id} 
                    value={item.id}
                >
                    {item.name}
                </option>
            ))}
        </select>
    </div>
);

export default select;