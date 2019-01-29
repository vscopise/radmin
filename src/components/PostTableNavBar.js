import React, { Component } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Typography,
    withStyles,
    AppBar,
    Toolbar,
    Select,
    Grid,
    FormHelperText
} from '@material-ui/core';
  
import styles from '../styles/Styles';

const PostTableNavBar = (props) => {
    const { classes } = props;

    return (
        <div className={classes.postTableNavBar}>
            <AppBar position='static' className={classes.appBar}>
                <Toolbar>
                    <Grid
                        justify='space-between'
                        container
                        spacing={24}
                    >
                        <Grid item>
                        <FormControl>
                            <Select
                                className={classes.select}
                                multiple
                                displayEmpty
                                value={props.categoriesSelected}
                                onChange={props.handleCategoriesChange}
                                renderValue={selected => {
                                    if (selected.length === 0) {
                                      return <em>Todas las categorías</em>;
                                    }
                      
                                    return selected.join(', ');
                                }}
                            >
                                {props.categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item>
                            <Button 
                                color='inherit'
                                onClick={props.fetchPosts}
                            >
                                Filtrar
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(PostTableNavBar);
