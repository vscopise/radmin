import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    withStyles,
    Button,
} from '@material-ui/core';

import styles from '../styles/Styles';

const MediaLibrary = (props) => {
    const { classes } = props;

    return (
        <div>
            <Grid container spacing={24}>
            {
                props.mediaItems.map(item =>(
                    <Grid item key={item.id} onClick={props.handleChange}>
                        <img src={item.media_details.sizes.thumbnail.source_url} />
                    </Grid>
                ))
            }
            </Grid>
            <Button
                variant='contained'
                color='primary'
                onClick={props.handleMediaClose}
            >Cerrar</Button>
        </div>
    );
}
    
MediaLibrary.propTypes = {
    classes: PropTypes.object.isRequired,
};
      
export default withStyles(styles)(MediaLibrary);
    