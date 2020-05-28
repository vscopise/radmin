import React from 'react';
import classes from './media-library.module.css';
import MediaThumbnailItem from './media-thumbnail-item/media-thumbnail-item';
import TextInput from '../text-input/text-input';
import MediaDetail from './media-detail/media-detail';

const MediaLibrary = (props) => (
    <div className={classes.MediaLibrary}>
        <div className='column-main'>
            <div className='column-box'>
                {   
                    props.mediaItems &&
                    <div>
                        {
                            props.mediaItems.map( item => (
                                <MediaThumbnailItem 
                                    item={item}
                                    key={item.id}
                                    handleClick={props.handleClick}
                                />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
        <div className='column-side'>
            <div className='column-box'>
                <TextInput 
                    name='searchItem'
                    value={props.searchItem}
                    onChange={props.handleChange}
                    label='Buscar imagen'
                    className='small'
                />
                {
                    props.searchItem !== '' &&
                    <button 
                        className={['button', 'button-secondary'].join(' ')}
                        onClick={props.fetchMediaItems}
                    >Buscar</button>
                }
                {
                    props.postFeaturedMedia &&
                    <MediaDetail 
                        postFeaturedMedia={props.postFeaturedMedia}
                    />
                }
            </div>
            <div className='column-box'>
                <input 
                    className={classes.ButtonFile}
                    onChange={props.handleUploadImage} 
                    type='file' 
                    name='uploadFile' 
                    id='upload-file' 
                />
                <label 
                    htmlFor='upload-file' 
                    className='label-button'
                >Seleccionar imagen local</label>
            </div>
            <div className='column-box'>
                <TextInput 
                    name='mediaCaption'
                    value={props.mediaCaption}
                    onChange={props.handleChange}
                    label='Nueva leyenda'
                    className='small'
                />
                {
                    '' !== props.mediaCaption &&
                    <button
                        className={'button'}
                        onClick={props.handleMediaSave}
                    >Guardar</button>
                }
            </div>
            <div className='column-box'>
                <button 
                    className={['button', 'button-secondary'].join(' ')}
                    onClick={props.handleShow}
                    data-window='PostEditor'
                >Cerrar</button>
            </div>
        </div>
    </div>
)

export default MediaLibrary;