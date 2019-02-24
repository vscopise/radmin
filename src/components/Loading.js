import React from 'react';
import { 
    withStyles
} from '@material-ui/core'

import loadingImg from '../assets/loading.gif';

const styles = (theme) => ({
    Loading: {
        textAlign: 'center',
        padding: `${theme.spacing.unit * 2}px 0`,
    }
})

const Loading = (props) => (
    <div className={props.classes.Loading}>
        <img 
            src={loadingImg} 
            alt='Cargando' 
            title='Cargando'
        />
    </div>
)

export default withStyles(styles)(Loading);