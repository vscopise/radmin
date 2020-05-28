import React from 'react';
import classes from './login.module.css';

const login = (props) => (
    <div className={classes.Container}>
        <div className={classes.Form}>
            <h2>Iniciar sesión</h2>
            <input 
                className={classes.input}
                type='text'
                name='userName' 
                value={props.userName} 
                onChange={props.handleChange} 
                placeholder='Usuario'
            />
            <input 
                className={classes.input}
                type='password'
                name='userPass' 
                value={props.userPass} 
                onChange={props.handleChange} 
                placeholder='Contraseña'
            />
            <button 
                className='button'
                onClick={props.fetchToken}
                disabled={props.loaading}
            >
                Acceder</button>
            <p>{props.signupMessage}</p>
        </div>
    </div>
);

export default login;