import React from 'react';
import {
    Button,
    FormControl,
    MenuItem,
    withStyles,
    AppBar,
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
                        <Grid item xs={5}>
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
                        <Grid item xs={5}>
                            <FormControl>
                                <select
                                    className={classes.select}
                                    multiple
                                    displayEmpty
                                    value={props.statusSelected}
                                    onChange={props.handleStatusChange}
                                    renderValue={selected => {
                                        if (selected.length === 0) {
                                        return <em>Todos los estados</em>;
                                        }
                        
                                        return selected.join(', ');
                                    }}
                                >
                                    {props.status.map(st => (
                                        <MenuItem key={st.id} value={st.label}>
                                            {st.label}
                                        </MenuItem>
                                    ))}
                                </select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
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
