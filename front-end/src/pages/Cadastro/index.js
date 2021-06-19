import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


function Cadastro() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
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
        const resposta = await fetch('https://desafio-m03.herokuapp.com/usuarios', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
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
        
        history.push('/');

        
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
      <Typography variant="h4">Criar uma conta</Typography>
      <TextField label="Seu nome" {...register('nome')} />
      <TextField label="Nome da loja" {...register('nome_loja')} />
      <TextField label="Email" {...register('email')} />
      <TextField label="Senha" {...register('senha')} type="password" 
        onChange={(e) => setSenha1(e.target.value)}/>
      <TextField label="Repita a senha"  {...register('senhaConfirmacao')} type="password" required 
        onChange={(e) => setSenha2(e.target.value)}/>
      <Button variant="contained" color="primary" type="submit">
        Criar conta
      </Button>

      <div>
        <Typography>Já possui uma conta?</Typography>
        <Button color="primary" onClick={() => history.push("/")}>
          Acesse
        </Button>
      </div>
    </form>
  );
}

export default Cadastro;