import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';

const PostBoxButton = (props) => {
    const { classes } = props;

    return (
        <Button 
            className={props.primary ? 'button' : 'button button1'}
            variant="contained" 
            color={props.primary ? 'primary' : 'default'}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </Button>
    );
}
    
PostBoxButton.propTypes = {
    classes: PropTypes.object.isRequired,
};
      
export default withStyles(styles)(PostBoxButton);
    