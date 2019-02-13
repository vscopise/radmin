import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';
import PostBoxButton from './PostBoxButton';

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
