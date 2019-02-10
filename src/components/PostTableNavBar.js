import React from 'react';
import {
    Button,
    FormControl,
    MenuItem,
    withStyles,
    AppBar,
    TextField,
    Toolbar,
    Select,
    Grid,
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
                                {
                                    props.categories &&
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
                                            return selected.map(
                                                s => props.categories.find(
                                                    c => c.id === s
                                                ).name + ', '
                                            )
                                        }}
                                    >
                                        {props.categories.map(cat => (
                                            <MenuItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                                {
                                    ! props.categories && 
                                    <TextField defaultValue='Todas las categorías' />
                                }
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <Select
                                    className={classes.select}
                                    multiple
                                    displayEmpty
                                    value={props.statusSelected}
                                    onChange={props.handleStatusChange}
                                    renderValue={selected => {
                                        if (selected.length === 0) {
                                        return <em>Publicadas</em>;
                                        }
                        
                                        return selected.join(', ');
                                    }}
                                >
                                    {props.status.map(status => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField 
                                    type='date'
                                    onChange={props.handleAfterDateChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField 
                                    type='date'
                                    onChange={props.handleBeforeDateChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant='contained'
                                color='primary'
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
