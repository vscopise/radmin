import React from 'react';
import Loader from '../../UI/loader/loader';
import classes from './layout.module.css';


const layout = (props) => (
    <div className={classes.layout}>
        <Loader 
            show={props.isLoading} 
        />
        {props.children}
    </div>
);

export default layout;