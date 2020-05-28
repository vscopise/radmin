import React from 'react';
import classes from './collapsed-box.module.css';

const collapsedBox = (props) => {
    let keys = {
        'Etiquetas': 'showTags',
        'Categorías': 'showCategories',
        'Estado y visibilidad': 'showStatus',
        'Imagen destacada': 'showFeaturedBox',
    }
    let show = ! props.show ? classes.hide : null;
    return (
        <div className={[classes.CollapsedBox, show].join(' ')}>
            <p 
                data-key={keys[props.title]} 
                onClick={props.handleToggleBoxShow}
            >{props.title}</p>
            <div className={classes.children}>
                {props.children}
            </div>
        </div>
    );
};

export default collapsedBox;