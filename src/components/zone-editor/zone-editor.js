import React from 'react';
import ZoneContainer from '../zone-container/zone-container';


import classes from './zone-editor.module.css';
import SearchZonePosts from '../search-zone-posts/search-zone-posts';

const zoneEditor = (props) => (
    <div className={classes.ZoneEditor}>
        <div className='column-main'>
            {
                props.postsZone &&
                <ZoneContainer 
                    postsZone={props.postsZone}
                    handleUpdateZonePosts={props.handleUpdateZonePosts}
                    fetchPostsZone={props.fetchPostsZone}
                    zoneSelected={props.zoneSelected}
                    replaceAll={props.replaceAll}
                />
            }
            <SearchZonePosts
                posts={props.posts}
                postsZone={props.postsZone}
                handleChange={props.handleChange}
                handleAddPost={props.handleAddPost}
                replaceAll={props.replaceAll}
            />
        </div>
        <div className='column-side'>
            <div className='column-box'>
                <div className={classes.ZonasSelect}>
                    {
                        props.zones &&
                        <select 
                            className={classes.Select}
                            onChange={props.handleChange}
                            name='zoneSelected'
                        >
                            {props.zones.map(
                                zone => (
                                    <option 
                                        key={zone.term_id} 
                                        value={zone.term_id}
                                    >{zone.name}</option>
                                )
                            )}
                        </select>
                    }
                    {
                        props.zones.filter(
                            zone => zone.term_id===parseInt(props.zoneSelected)
                        ).length !== 0 &&
                        <p>{props.zones.filter(
                            zone => zone.term_id===parseInt(props.zoneSelected)
                        )[0].description}</p>
                    }
                </div>
                <button
                    className={['button', 'button-primary'].join(' ')}
                    onClick={() => props.handleSaveZone(props.zoneSelected)}
                >Guardar</button>
                <button 
                    className={['button', 'button-secondary'].join(' ')}
                    onClick={props.handleShow}
                    data-window='PostTable'
                >Cerrar</button>
            </div>
        </div>
    </div>
)

export default zoneEditor;