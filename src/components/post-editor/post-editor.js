import React from 'react';

import Datetime from 'react-datetime';

import classes from './post-editor.module.css';
import 'react-datetime/css/react-datetime.css';

import * as Constants from '../../assets/constants';


import CollapsedBox from '../collapsed-box/collapsed-box';
import RichEditor from '../rich-editor/rich-editor';
import Select from '../select/select';
import SelectTerm from '../select-term/select-term';
import TextInput from '../text-input/text-input';

const PostEditor = (props) => (
    <div className={classes.PostEditor}>
        <div className='column-main'>
            <div className='column-box'>
                <TextInput 
                    name = 'postColgado'
                    value={props.postColgado}
                    onChange={props.handleChange}
                    label='Colgado'
                />
                <TextInput 
                    name = 'postTitle'
                    value={props.postTitle}
                    onChange={props.handleChange}
                    label='Título'
                />
                <TextInput 
                    name = 'postExcerpt'
                    value={props.postExcerpt}
                    onChange={props.handleChange}
                    label='Extracto'
                />
                <RichEditor 
                    editorState = {props.postEditorState}
                    handleContentChange = {props.handleContentChange}
                />
                <TextInput 
                    name = 'postRedactor'
                    value = {props.postRedactor}
                    onChange = {props.handleChange}
                    label = 'Redactor'
                />
            </div>
        </div>
        <div className='column-side'>
            <div className='column-box'>
                <CollapsedBox
                    title='Categorías'
                    show={props.showCategories}
                    handleToggleBoxShow={props.handleToggleBoxShow}
                >
                    <SelectTerm
                        name='searchCategory'
                        searchTerm={props.searchCategory}
                        postTerms={props.postCategories}
                        terms={props.categories}
                        selectTerms='postCategories'
                        handleChange={props.handleChange}
                        handleSelect={props.handleSelect}
                        label='Buscar Categorias'
                    />
                </CollapsedBox>
                <CollapsedBox
                    title='Etiquetas'
                    show={props.showTags}
                    handleToggleBoxShow={props.handleToggleBoxShow}
                >
                    <SelectTerm
                        name='searchTag'
                        searchTerm={props.searchTag}
                        postTerms={props.postTags}
                        terms={props.tags}
                        selectTerms='postTags'
                        handleChange={props.handleChange}
                        handleSelect={props.handleSelect}
                        label='Buscar Etiquetas'
                    />
                </CollapsedBox>
                <CollapsedBox
                    title='Estado y visibilidad'
                    show={props.showStatus}
                    handleToggleBoxShow={props.handleToggleBoxShow}
                >
                    <Datetime 
                        value={props.postDate} 
                        onChange={props.handleDateChange}
                        dateFormat='D \d\e MMMM, YYYY'
                        className={classes.postDate} 
                    />
                    <Select 
                        label='Visibilidad' 
                        items={Constants.status} 
                        name='postStatus'
                        onChange={props.handleChange}
                        value={props.postStatus}
                    />
                    <Select
                        label='Autor'
                        items={props.users}
                        name='postAuthor'
                        onChange={props.handleChange}
                        value={props.postAuthor}
                    />
                </CollapsedBox>
                <CollapsedBox
                    title='Imagen destacada'
                    show={props.showFeaturedBox}
                    handleToggleBoxShow={props.handleToggleBoxShow}
                >
                    {
                        props.postFeaturedMedia &&
                        <img 
                            src={props.postFeaturedMedia.media_details.sizes.full.source_url} 
                            alt={props.postFeaturedMedia.title.rendered} 
                        />
                    }
                    
                    <button
                        className={['button', 'button-secondary'].join(' ')}
                        onClick={props.handleShow}
                        data-window='MediaLibrary'
                    >{
                        props.postFeaturedMedia ? 'Cambiar imagen destacada' : 'Establecer imagen destacada'
                    }</button>
                </CollapsedBox>
                <div className='column-box'>
                    <button 
                        className={['button', 'button-secondary'].join(' ')}
                        onClick={props.handleShow}
                        data-window='PostTable'
                    >Cerrar</button>
                    <button
                        className={['button', 'button-primary'].join(' ')}
                        onClick={props.handleSavePost}
                    >
                        { props.postId ? 'Actualizar' : 'Guardar' }
                    </button>
                    { props.saveMessage && <p>{props.saveMessage}</p> }
                </div>
            </div>
        </div>
    </div>
);

export default PostEditor;