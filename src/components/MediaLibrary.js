import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    withStyles,
    Button,
} from '@material-ui/core';

const styles = {
    MediaLibrary: {
        '& .media-selected': {
            textAlign: 'center',
            marginBottom: 20,
            '& .details': {
                fontSize: '0.9rem',
                color: '#aaa',
            },
        },
    }
}

const MediaLibrary = (props) => {

    return (
        <Grid container spacing={24} className={props.classes.MediaLibrary}>
            <Grid item xs={12} sm={9}>
                <Grid container spacing={24}>
                {
                    props.mediaItems.map(item =>(
                        <Grid item key={item.id} onClick={e => props.handleMediaSelect(e, item)}>
                            <img src={item.media_details.sizes.thumbnail.source_url} />
                        </Grid>
                    ))
                }
                </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
                {
                    props.postFeaturedImage &&
                    <div className='media-selected'>
                        <img 
                            src={props.postFeaturedImage.media_details.sizes.thumbnail.source_url} 
                            alt='' 
                        />
                        <p>{props.postFeaturedImage.slug}</p>
                        <p className='details'>
                            {
                                `Dimensiones: 
                                ${props.postFeaturedImage.media_details.width}
                                 x 
                                 ${props.postFeaturedImage.media_details.height} px`
                            }
                        </p>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={props.handleMediaConfirm}
                        >Confirmar</Button>
                    </div>
                }
                <div className='media-selected'>
                    <Button
                        component='span'
                        onClick={props.handleMediaCancel}
                    >Cancelar selección</Button>
                </div>
            </Grid>
        </Grid>
    );
}
    
MediaLibrary.propTypes = {
    classes: PropTypes.object.isRequired,
};
      
export default withStyles(styles)(MediaLibrary);
    