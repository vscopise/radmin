import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardContent,
    Typography,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';
//import PostBoxButton from './PostBoxButton';

const PostBoxButton = (props) => {
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

const PostBox = (props) => {
    const { classes } = props;

    return (
        <Card className={classes.postBox}>
            <CardContent>
                <Typography 
                    className='label'
                    color="textSecondary" gutterBottom>
                    {props.title}
                </Typography>
            {
                props.postFeaturedImage &&
                <img src={props.postFeaturedImage} alt='' />
            }
            {
                props.onClick1 &&
                <PostBoxButton 
                    onClick={props.onClick1}
                    primary={false}
                    disabled={props.disabledButtons}
                    label='Cerrar'
                />
            }
            {
                props.onClick2 &&
                <PostBoxButton 
                    onClick={props.onClick2}
                    primary={true}
                    disabled={props.disabledButtons}
                    label='Actualizar'
                />
            }
            {
                props.message !== '' && 
                <Typography 
                    className='label secondary'
                    color="textSecondary" gutterBottom>
                    {props.message}
                </Typography>
            }
            </CardContent>            
        </Card>
    );
}

PostBox.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PostBox);
