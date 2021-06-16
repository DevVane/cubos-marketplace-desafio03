CREATE DATABASE market_cubos;

DROP TABLE IF EXISTS usuarios, produtos;

CREATE TABLE usuarios(
  id serial primary key,
  nome text not null,
  nome_loja text not null,
  email text not null unique,
  senha text not null
);

CREATE TABLE produtos(
  id serial primary key,
  usuario_id integer not null references usuarios(id),
  nome text not null,
  estoque integer not null,
  categoria text,
  preco integer not null,
  descricao text not null,
  imagem text
);
