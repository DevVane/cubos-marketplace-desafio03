import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuthContext from '../../hook/useAuthContext';

function Login() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { setToken, setUsuario } = useAuthContext();

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    try {
        const resposta = await fetch('https://desafio-m03.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json'
            }
          });
        
        const dados = await resposta.json();

        setCarregando(false);
        
        if(!resposta.ok){
            setErro(dados);
            return;
        }
        
        
        setToken(dados.token);
        setUsuario(dados.usuario);
        
        
        history.push('/produtos');
      
    } catch (error) {
        setErro(error.message);
    }

    
  }

  return (
    <form 
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {erro && <Alert severity="error">{erro}</Alert>}
      {carregando && <CircularProgress />}
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" {...register('email')} />
      <TextField label="Senha" {...register('senha')} type="password" />
      <Button variant="contained" color="primary" type="submit">
        Entrar 
      </Button>
      
      <div>
        <Typography>Primeira vez aqui?</Typography>
        <Button color="primary" onClick={() => history.push("/cadastro")}>
          Cadastre-se
        </Button>
      </div>
      
    </form>
  );
}

export default Login;