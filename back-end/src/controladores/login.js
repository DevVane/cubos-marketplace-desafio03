const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');

async function login(req,res){
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json("Informe o e-mail e a senha.");
    }

    try {
        const queryConsultaEmail = 'select * from usuarios where email = $1';
        const emailCadastrado = await conexao.query(queryConsultaEmail, [email]);

        if (emailCadastrado.rowCount === 0) {
            return res.status(404).json("Ops, email e senha não confere."); //na real o email não ta cadastrado
        }

        const usuarioCadastrado = emailCadastrado.rows[0];
        
        const senhaVerificada = await bcrypt.compare(senha, usuarioCadastrado.senha);

        if (!senhaVerificada) {
            return res.status(400).json("Email e senha não confere.");
        }

        const token = jwt.sign(
            { id: usuarioCadastrado.id }, 
            segredo, 
            { expiresIn: '1d' });

        const { senha: senhaUsuario, ...dadosUsuario } = usuarioCadastrado;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}