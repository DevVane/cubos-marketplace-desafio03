const jwt = require('jsonwebtoken');
const segredo = require('../segredo');
const conexao = require('../conexao');

async function verificaLogin(req, res, next){
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(400).json("Token não informado");
    }
    
    try {
        const token = authorization.replace('Bearer', '').trim();

        const usuarioValidado = jwt.verify(token, segredo);

        const queryUsuarioEncontrado = 'select * from usuarios where id = $1';
        const { rows, rowCount } = await conexao.query(queryUsuarioEncontrado, [usuarioValidado.id]);

        if (rowCount === 0) {
            return res.status(404).json("O usuario não foi encontrado");
        }

        const { senha, ...usuario } = rows[0];

        req.usuario = usuario;
        
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    verificaLogin
}
