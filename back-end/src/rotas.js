const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const perfil = require('./controladores/perfil');
const produtos = require('./controladores/produtos');


const rotas = express();

//cadastro do usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

// login
rotas.post('/login', login.login);

//intermediario
rotas.use(verificaLogin);

//perfil
rotas.get('/perfil', perfil.obterPerfil);
rotas.put('/perfil', perfil.atualizarPerfil);


//produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);

module.exports = rotas;