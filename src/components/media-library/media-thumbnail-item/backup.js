import React from 'react';
import classes from './media-thumbnail-item.module.css'

const mediaThumbnailItem = (props) => (
    <div className={classes.MediaItem}>
        <div 
            className={classes.Thumbnail} 
            onClick={props.handleClick}
            >
            { 
                props.item.media_details.sizes &&
                <img 
                    src={props.item.source_url} 
                    //src={props.item.media_details.sizes.thumbnail.source_url} 
                    alt='' 
                    id={props.item.id}
                    data-name='mediaSelected'
                    data-key={props.item.id}
                />
            }
        </div>
    </div>
);

export default mediaThumbnailItem;