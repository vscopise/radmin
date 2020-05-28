import React from 'react';
import classes from '../media-library.module.css';

const mediaDetail = (props) => {
    const media = props.postFeaturedMedia;
    const date = new Date(media.date).toLocaleString(
        'es-ES', { year: 'numeric', month: 'long', day: 'numeric' }
    );
    const dimensions = `${media.media_details.width}x${media.media_details.height}`;
    return (
        <div className={classes.MediaDetail}>
            <img 
                src={media.media_details.sizes.full.source_url} 
                alt={media.title.rendered} 
            />
            <p className={classes.MediaDetailTitle}>{media.media_details.sizes.full.file}</p>
            <p>{date}</p>
            <p>{dimensions}</p>
            <p 
                className={classes.MediaCaption}
                dangerouslySetInnerHTML={{__html: 'Leyenda: ' + media.caption.rendered} }
            />
        </div>
    )
};

export default mediaDetail;