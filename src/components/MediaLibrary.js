import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';

const MediaLibrary = (props) => {
    const { classes } = props;

    return (
        <Grid container spacing={24}>
        {
            props.mediaItems.map(item =>(
                <Grid item key={item.id}>
                    <img src={item.media_details.sizes.thumbnail.source_url} />
                </Grid>
            ))
        }
        </Grid>
    );
}
    
MediaLibrary.propTypes = {
    classes: PropTypes.object.isRequired,
};
      
export default withStyles(styles)(MediaLibrary);
    