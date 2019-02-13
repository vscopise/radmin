import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    InputLabel,
    MenuItem,
    Select,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';

const MediaLibrary = (props) => {
    const { classes } = props;

    return (
        <Fragment>
            <InputLabel>MediaLibrary</InputLabel>
            
        </Fragment>
    );
}
    
MediaLibrary.propTypes = {
    classes: PropTypes.object.isRequired,
};
      
export default withStyles(styles)(MediaLibrary);
    