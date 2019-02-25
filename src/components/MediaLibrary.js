import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    withStyles,
    Button,
    Tab,
    Tabs,
    TextField,
    Card,
    CardMedia,
    CardContent,
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
        '& .card': {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        '& .card-media': {
            height: 0,
            paddingTop: '56.25%',
        },
        '& input[type="file"]': {
            opacity: 0,
            position: 'absolute',
            pointerEvents: 'none',
            width: 1,
            height: 1,
        },
        '& .label-button': {
            padding: '10px 16px',
            color: 'rgba(0, 0, 0, 0.87)',
            borderRadius: 4,
            fontSize: '0.875rem',
            lineHeight: '1.75',
            fontWeight: '500',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
            marginRight: 10,
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
            }
        },
    }
}

const MediaLibrary = (props) => {
    return (
        <Grid container spacing={24} className={props.classes.MediaLibrary}>
            <Tabs
                value={props.tabsValue}
                onChange={props.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Subir imagen" />
                <Tab label="Biblioteca de Imágenes" />
            </Tabs>
            <Grid item xs={12} sm={9}>
            {
                ! props.isLoading && ! props.imageDetail && props.tabsValue===0 &&
                <Grid container spacing={24}>
                    <Card className='card'>
                        {
                        props.uploadFile &&
                            <CardMedia
                                image={props.previewImgUrl} 
                                className='card-media'
                            />
                        }
                        <CardContent>
                            <input onChange={props.handleChange} type='file' name='uploadFile' id='upload-file' />
                            <label for='upload-file' className='label-button'
                            >Seleccionar imagen local</label>
                            {
                                props.uploadFile &&
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={props.handleUploadImage}
                                >Subir imagen</Button>
                            }
                            {
                                props.isLoading &&
                                <Loading/>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            }
            {
                ! props.isLoading && ! props.imageDetail && props.tabsValue===1 &&
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
                props.isLoading && props.tabsValue===0 &&
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
    