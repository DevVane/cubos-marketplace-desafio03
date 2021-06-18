import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

import useAuthContext from '../../../hook/useAuthContext';
import NavBar from '../../../components/NavBar';

import { useHistory } from 'react-router-dom';


export default function Perfil() {
  const classes = useStyles();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { token, usuario, setUsuario } = useAuthContext();

  async function carregarUsuario() {

    try {
      const resposta = await fetch('https://desafio-m03.herokuapp.com/perfil', {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${token}`

            }
          });
        
        const usuarioApi = await resposta.json();

        
        if(!resposta.ok){
            setErro(usuarioApi);
            return;
        }
      console.log(usuarioApi);
      setUsuario(usuarioApi);

    } catch (error) {
      console.log(error.message);
      setErro(error.message);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h3">
          {usuario.nome_loja}
        </Typography>
        <Typography variant="h4">
          Perfil
        </Typography>
        
        <form 
            className={classes.root}
            noValidate
            autoComplete="off"
            
        >
            <div className={classes.inputs}>
              <TextField label="Seu nome"  value={usuario.nome} disabled />
              <TextField label="Nome da loja" value={usuario.nome_loja} disabled />
              <TextField label="Email" value={usuario.email} disabled />
            

              <Divider/>
              
              <Button variant="contained" color="primary" size="small"  onClick={() => history.push("/perfil/editar")}>
                  Editar perfil
              </Button>
            </div>
                
            
        </form>

        {erro && <Alert severity="error">{erro}</Alert>}
        {carregando && <CircularProgress />}
        
      </main>
    </div>
  );
}





