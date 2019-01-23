import React from 'react';
import { 
    withStyles
} from '@material-ui/core'

import loadingImg from '../assets/loading.gif';
import styles from '../styles/Styles'

const Loading = (props) => (
    <div className={props.classes.Loading}>
        <img 
            src={loadingImg} 
            alt='Cargando' 
            title='Cargando'
        />
    </div>
)

export default withStyles(styles)(Loading)