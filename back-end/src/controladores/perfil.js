const conexao = require('../conexao');
const bcrypt = require('bcrypt');

async function obterPerfil(req, res){
    const { usuario } = req;

    return res.status(200).json(usuario);

}

async function atualizarPerfil(req, res){
    const { id } = req.usuario;
    const { nome, nome_loja, email: novoEmail, senha} = req.body;
    
    try {
        const emailJaUsado = await conexao.query('select * from usuarios where email = $1', [novoEmail]);

        if (emailJaUsado.rowCount > 0) {
            return res.status(404).json("O email fornecido já está cadastrado");
        }

        if (!nome && !nome_loja && !novoEmail && !senha) {
            return res.status(400).json("Informe os campos a serem alterados.");
        }
        
        if(nome){
            const queryNomeAtualizado = `update usuarios set 
            nome = $1 
            where id = $2`;
            const nomeAtualizado = await conexao.query(queryNomeAtualizado, [nome, id]);
        
            if (nomeAtualizado.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar o nome do usuário");
            }
        }

        if(nome_loja){
            const queryNomeLojaAtualizado = `update usuarios set 
            nome_loja = $1 
            where id = $2`;
            const nomeLojaAtualizado = await conexao.query(queryNomeLojaAtualizado, [nome_loja, id]);
        
            if (nomeLojaAtualizado.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar o nome da loja");
            }

        }

        if(novoEmail){
            const queryEmailAtualizado = `update usuarios set 
            email = $1 
            where id = $2`;
            const emailAtualizado = await conexao.query(queryEmailAtualizado, [novoEmail, id]);
        
            if (emailAtualizado.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar o email");
            }
        }

        if(senha){
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const querySenhaAtualizada = `update usuarios set 
            senha = $1 
            where id = $2`;
            const senhaAtualizada = await conexao.query(querySenhaAtualizada, [senhaCriptografada, id]);
        
            if (senhaAtualizada.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar a senha");
            }

        }

        return res.status(200).json("O usuario foi atualizado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }


}

module.exports = {
    obterPerfil,
    atualizarPerfil
}