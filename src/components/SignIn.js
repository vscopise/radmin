import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import styles from '../styles/Styles';

const SignIn = (props) => {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Usuario</InputLabel>
          <Input 
            id="username" 
            name="username" 
            autoComplete="usuario" 
            autoFocus 
            onChange={e => props.username(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <Input 
            name="password" 
            type="password" 
            id="password" 
            autoComplete="current-password" 
            onChange={e => props.password(e.target.value)}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {
          props.isLoading && <p>Cargando...</p>
        }
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={props.disabled}
          onClick={props.fetchToken}
        >
          Enviar
        </Button>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
