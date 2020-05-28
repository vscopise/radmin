import React from 'react';
import classes from './posts-table-controls.module.css';
import PostsTableControlSelect from '../posts-table-control-select/posts-table-control-select';
import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';

const postTableControls = (props) => (
    <div className={classes.postTableControls}>
        <PostsTableControlSelect
            name='categorySelected'
            label='Categorías'
            items={props.categories}
            handleChange={props.handleChange}
            itemSelected={props.categorySelected}
        />
        <PostsTableControlSelect
            name='tagSelected'
            label='Etiquetas'
            items={props.tags}
            handleChange={props.handleChange}
            itemSelected={props.tagSelected}
        />
        <Datetime 
            value={props.dateBefore} 
            onChange={props.handleDateBeforeChange}
            dateFormat='D MMMM, YYYY'
            timeFormat={false}
            className={classes.postDate}
        />
        <Datetime 
            value={props.dateAfter} 
            onChange={props.handleDateAfterChange}
            dateFormat='D MMMM, YYYY'
            timeFormat={false}
            className={classes.postDate}
        />
        {
            props.selectedPosts.length > 0 &&
            <button
                className={[classes.Button, classes.Papelera].join(' ')}
                onClick={props.handleTrashPosts}
            >Papelera</button>
        }
        {
            (props.categorySelected !== '0' ||
            props.tagSelected !== '0' ||
            props.dateAfter !== '' ||
            props.dateBefore !== '') &&
            <button
            className={classes.Button}
            onClick={props.handleFilterClear}
            >Limpiar filtros</button>
        }
        
        <button 
            className={classes.Button} 
            onClick={props.fetchPosts}
        >Filtrar</button>
        <button
            className={[classes.Button, classes.Zonas].join(' ')}
            onClick={props.zonesEdit}
        >Zonas</button>
        <button 
            className={[classes.Button, classes.NewPost].join(' ')}
            onClick={props.newPost}
        >Añadir nueva</button>
    </div>
);

export default postTableControls;