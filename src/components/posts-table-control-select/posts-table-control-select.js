import React from 'react';
import classes from './posts-table-control-select.module.css';

const postsTableControlSelect = (props) => (
        props.items &&
        <select 
            className={classes.Select} 
            name={props.name} 
            onChange={props.handleChange}
            value={props.itemSelected}
        >
            <option value={0}>Todas las {props.label}</option>
            {props.items.map(
                item => (
                    <option 
                        key={item.id} 
                        value={item.id}
                    >{item.name}</option>
                )
            )}
        </select>

    );

export default postsTableControlSelect;