const conexao = require('../conexao');
const bcrypt = require('bcrypt');

async function cadastrarUsuario(req, res){
    const { nome, nome_loja, email, senha} = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.");
    }
    if (!nome_loja) {
        return res.status(400).json("O campo nome_loja é obrigatório.");
    }
    if (!email) {
        return res.status(400).json("O campo email é obrigatório.");
    }
    if (!senha) {
        return res.status(400).json("O campo senha é obrigatório.");
    }
    
    try {
        const queryConsultaEmail = 'select * from usuarios where email = $1';
        const emailCadastrado = await conexao.query(queryConsultaEmail, [email]);

        if (emailCadastrado.rowCount > 0) {
            return res.status(400).json("Já existe usuário cadastrado com esse e-mail.");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const queryCadastrarUser = `insert into usuarios (nome, nome_loja, email, senha) 
        values ($1, $2, $3, $4)`;
        const usuarioCadastrado = await conexao.query(queryCadastrarUser, [nome, nome_loja, email, senhaCriptografada]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json("Não foi possivel cadastrar o usuario");
        }

        return res.status(200).json("Usuário cadastrado com sucesso.")
   
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    cadastrarUsuario
}