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
  
const styles = (theme) => ({
    postTableNavBar: {
        flexGrow: 1,
        '& .app-bar': {
            backgroundColor: '#cfcfcf',
            marginBottom: theme.spacing.unit,
        }
    },
})

const TableNavDateInput = (props) => (
    <Grid item>
        <FormControl>
            <TextField 
                type='date'
                onChange={props.handleChange}
                name={props.name}
            />
        </FormControl>
    </Grid>
)

const TableNavSelectInput = (props) => (
    <Grid item>
        <FormControl>
        {
            props.items &&
            <Select
                className='table-nav-select-input'
                multiple
                displayEmpty
                value={props.itemSelected}
                onChange={props.handleChange}
                name={props.name}
                renderValue={selected => {
                    if (selected.length === 0) {
                        return <em>{props.label}</em>
                    }
                    return selected.map(
                        s => props.items.find(
                            c => c.id === s
                        ).name + ', '
                    )
                }}
            >
                {props.items.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        }
        {
            ! props.items &&
            <TextField defaultValue={props.label} />
        }
        </FormControl>
    </Grid>
)

const TableNavButtonInput = (props) => (
    <Grid item>
        <Button 
            variant='contained'
            color='primary'
            onClick={props.onClick}
        >{props.label}</Button>
    </Grid>
)

const PostTableNavBar = (props) => {
    return (
        <div className={props.classes.postTableNavBar}>
            <AppBar position='static' className='app-bar'>
                <Toolbar>
                    <Grid
                        justify='space-between'
                        container
                        spacing={24}
                    >
                        <TableNavSelectInput
                            itemSelected={props.categoriesSelected}
                            handleChange={props.handleChange}
                            name='categoriesSelected'
                            label='Todas las categorías'
                            items={props.categories}
                        />
                        <TableNavSelectInput
                            itemSelected={props.tagsSelected}
                            handleChange={props.handleChange}
                            name='tagsSelected'
                            label='Todas las etiquetas'
                            items={props.tags}
                        />
                        <TableNavSelectInput
                            itemSelected={props.statusSelected}
                            handleChange={props.handleChange}
                            name='statusSelected'
                            label='Publicadas'
                            items={props.status}
                        />
                        <TableNavDateInput 
                            name='dateAfter' 
                            handleChange={props.handleChange} 
                        />
                        <TableNavDateInput 
                            name='dateBefore' 
                            handleChange={props.handleChange}
                        />
                        {
                            props.categories && props.tags &&
                            <TableNavButtonInput 
                                onClick={props.fetchPosts} 
                                label='Filtrar' 
                            />
                        }
                        {
                            props.categories && props.tags &&
                            <TableNavButtonInput 
                                onClick={props.newPost} 
                                label='Nueva entrada' 
                            />
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(PostTableNavBar);
