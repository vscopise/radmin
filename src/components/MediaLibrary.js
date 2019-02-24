import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    withStyles,
    Button,
    TextField,
} from '@material-ui/core';
import Loading from './Loading';

const styles = {
    MediaLibrary: {
        '& .media-selected': {
            textAlign: 'center',
            marginBottom: 20,
            '& .details': {
                fontSize: '0.9rem',
                color: '#aaa',
            },
            '& img': {
                cursor: 'pointer',
            }
        },
        '& .image-container img': {
            width: '100%',
            height: 'auto'
        }
    }
}

const MediaLibrary = (props) => {

    return (
        <Grid container spacing={24} className={props.classes.MediaLibrary}>
            <Grid item xs={12} sm={9}>
            {
                ! props.isLoading && ! props.imageDetail &&
                <Grid container spacing={24}>
                {
                    props.mediaItems.map(item =>(
                        <Grid item key={item.id} onClick={e => props.handleMediaSelect(e, item)}>
                            <img src={item.media_details.sizes.thumbnail.source_url} alt='' />
                        </Grid>
                    ))
                }
                </Grid>
            }
            {
                ! props.isLoading && props.imageDetail &&
                <div className='image-container'>
                    <img src={props.postFeaturedImage.media_details.sizes.full.source_url} alt='' />
                </div>
            }
            {
                props.isLoading &&
                <Loading/>
            }
            </Grid>
            <Grid item xs={12} sm={3}>
                <div className='media-selected'>
                    <TextField 
                        label='Buscar imágenes'
                        name='searchItems'
                        value={props.searchItems}
                        onChange={props.handleChange}
                    />
                </div>
                <div className='media-selected'>
                    <Button 
                        onClick={props.fetchMediaItems}
                    >Buscar imágenes</Button>
                </div>
                {
                    props.postFeaturedImage &&
                    <div className='media-selected' onClick={props.handleimageDetail}>
                        <img 
                            src={props.postFeaturedImage.media_details.sizes.thumbnail.source_url} 
                            alt='Click para ver en detalle' 
                            title='Click para ver en detalle'
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
    