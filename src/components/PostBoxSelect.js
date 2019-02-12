import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    InputLabel,
    MenuItem,
    Select,
    withStyles,
} from '@material-ui/core';

import styles from '../styles/Styles';

const PostBoxSelect = (props) => {
    const { classes } = props;

    return (
        <Fragment>
            <InputLabel>{props.title}</InputLabel>
            <Select
                className={classes.sideEditorInput}
                multiple={props.multiple}
                value={props.value}
                onChange={(e) => props.handleChange}
                name={props.name}
            >
                {props.items.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>

        </Fragment>
    );
}
    
PostBoxSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};
      
export default withStyles(styles)(PostBoxSelect);
    