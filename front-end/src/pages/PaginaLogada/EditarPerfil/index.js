import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';


export default function EditarPerfil() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { token, usuario} = useAuthContext();
  const [senha1, setSenha1] = useState(null);
  const [senha2, setSenha2] = useState(null);

  async function onSubmit(data) {
    if(senha1 !== senha2){
      setErro("As senhas não são iguais");
      return;
    }
    

    setCarregando(true);
    setErro('');

    try {
        const resposta = await fetch('https://desafio-m03.herokuapp.com/perfil', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-type': 'application/json'
            }
            });
        
        const dados = await resposta.json();
        console.log(resposta, dados);

        setCarregando(false);

        if(!resposta.ok){
            setErro(dados);
            return;
        }
        
        history.push('/perfil');
        

        
    } catch (error) {
      setErro(error.message);
    }

  }  

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
          Editar Perfil
        </Typography>
        
        <form 
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={classes.inputs}>
                <TextField label="Seu nome" {...register('nome')} />
                <TextField label="Nome da loja" {...register('nome_loja')} />
                <TextField label="Email" {...register('email')} />
                <TextField label="Nova senha" {...register('senha')} type="password"
                  onChange={(e) => setSenha1(e.target.value)} />
                <TextField label="Repita a nova senha"  {...register('senhaConfirmacao')} type="password"
                  onChange={(e) => setSenha2(e.target.value)} />
            

              <Divider/>
              
              <Button color="primary" onClick={() => history.push("/perfil")}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" type="submit">
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





