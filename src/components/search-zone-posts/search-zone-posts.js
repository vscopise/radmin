import React from 'react';
import classes from './search-zone-posts.module.css';
import * as Constants from '../../assets/constants';

const searchZonePosts = (props) => (
    <div className={classes.SearchZonePosts}>
        <h3>Contenido de la zona</h3>
        <div className={classes.postItems}>
            <div>
                {props.posts.filter(
                        p => ! props.postsZone.some(z => z.ID === p.id)
                    ).map(post =>
                    <p
                        id={post.id}
                        key={post.id}
                        onClick={props.handleAddPost}
                    >{props.replaceAll(post.title.rendered, Constants.stringReplacement)}</p>
                )}
            </div>
        </div>
        <input 
            className={classes.inputTitle} 
            name='searchPosts'
            onChange={props.handleChange}
        />
        <button 
            className={['button', 'button-secondary', classes.searchPost].join(' ')}
        >Buscar</button>
    </div>
)

export default searchZonePosts;