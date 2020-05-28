import React from 'react';
import classes from './loader.module.css';

const loader = (props) => (
    props.show ? <div className={classes.Loader}>Cargando...</div> : null
);

export default loader;