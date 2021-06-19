import React, { useEffect, useState } from 'react';
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

import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function EditarProduto() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { token, usuario} = useAuthContext();
  const { id } = useParams();
  const [imagem, setImagem] = useState('');

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');
    
    data.preco = data.preco * 100;
    

    try {
      const resposta = await fetch(`https://desafio-m03.herokuapp.com/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-type': 'application/json'
        }
        });
      
      const dados = await resposta.json();

      setCarregando(false);

      if(!resposta.ok){
          setErro(dados);
          return;
      }
      
      history.push('/produtos');
      
    } catch (error) {
      setErro(error.message);
    }

  }  

  async function imagemProduto() {
    setCarregando(true);
    setErro('');
    
    try {
      const resposta = await fetch(`https://desafio-m03.herokuapp.com/produtos/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
            
        }
        });
      
      const dados = await resposta.json();
     
      setCarregando(false);

      if(!resposta.ok){
          setErro(dados);
          return;
      }

      setImagem(dados.imagem);
      
    } catch (error) {
      setErro(error.message);
    }

  }  

  useEffect(() => {
    imagemProduto();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      
      <main className={classes.content}>
        <div className={classes.toolbar} >
          <Typography variant="h3">
            {usuario.nome_loja}
          </Typography>
          <Typography variant="h4">
            Editar Produto
          </Typography>
          
          
            <form 
              className={classes.toolbar}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              
              <div className={classes.ladoalado}>
                <div className={classes.inputs}>
                  <TextField label="Nome do produto" {...register('nome')} />
                  
                  <div className={classes.ladoalado}>
                    <TextField label="Preço" placeholder='R$' {...register('preco')} />
                    <TextField label="Estoque" placeholder='Un' {...register('estoque')} />
                  </div>

                  <TextField label="Descrição do produto"  {...register('descricao')} />
                  <TextField label="Imagem"  {...register('imagem')} />
                
                </div>
                <img src={imagem} className={classes.media}/>
                
              </div>
            
          
            <Divider/>

            {erro && <Alert severity="error">{erro}</Alert>}
            {carregando && <CircularProgress />}
            
            <div className={classes.ladoalado}>
              <Button color="primary" onClick={() => history.push("/produtos")}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" size="small" type="submit">
                Salvar Alterações
              </Button>
            </div>
            </form>


        </div>

        
      </main>
    </div>
  );
}





