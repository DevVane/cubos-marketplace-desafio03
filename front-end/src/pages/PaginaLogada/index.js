import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useAuthContext from '../../hook/useAuthContext';

import NavBar from '../../components/NavBar';
import { useHistory } from 'react-router-dom';

export default function PaginaLogada() {
  const classes = useStyles();
  const [produtos, setProdutos] = useState([]);
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { token, usuario } = useAuthContext();


  async function carregarProdutos() {
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch('https://desafio-m03.herokuapp.com/produtos', {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${token}`

            }
          });
        
        const produtosApi = await resposta.json();

        setCarregando(false);

        if(!resposta.ok){
            setErro(produtosApi);
            return;
        }
     
      setProdutos(produtosApi);

    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function AlertDialog({produtoId}) {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete = async () => {
      setCarregando(true);

      try {
        const resposta = await fetch(`https://desafio-m03.herokuapp.com/produtos/${produtoId}`, {
          method: 'DELETE',
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
      
        carregarProdutos();
        
      } catch (error) {
        setErro(error.message);
        
      }
      setOpen(false);
    };
  
    return (
      <div>
        <Button className={classes.deletar} onClick={handleClickOpen}>
          <IconButton aria-label="remover produto">
            <DeleteSweepIcon/>
          </IconButton>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Remover produto do catálogo?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Essa ação não poderá ser desfeita
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Manter produto
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Remover
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

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
            Seus produtos
          </Typography>
          <div className={classes.cards}>
            {produtos.map( produto => (
              <Card key={produto.id} className={classes.card} >
                <AlertDialog produtoId={produto.id}/>

                <CardMedia
                  className={classes.media}
                  image={produto.imagem}
                  title={produto.nome}
                  onClick={()=> history.push(`/produto/${produto.id}/editar`)}
                />
                <CardContent onClick={()=> history.push(`/produto/${produto.id}/editar`)}>
                  <Typography variant="h6" color="textPrimary">
                    {produto.nome}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {produto.descricao}
                  </Typography>
                  <div className={classes.flex}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {produto.estoque} UNIDADE(S)
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                      R${produto.preco/100}
                    </Typography>
                  </div>

                </CardContent>
                
              </Card>
            ))}
             {erro && <Alert severity="error">{erro}</Alert>}
             {carregando && <CircularProgress />}
          </div>
        </div>
       

        <Divider/>

        <Button variant="contained" size="small" color="primary" 
          className={classes.button}
          onClick={() => history.push("/produtos/novo")} >
          Adicionar Produto
        </Button>

        
      </main>

    </div>
  );
}





