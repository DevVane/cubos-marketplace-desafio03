const conexao = require('../conexao');

async function listarProdutos(req, res){
    try {
        const { rows: produtos } = await conexao.query('select * from produtos');

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

async function obterProduto(req, res){
    const { id } = req.params;
    try {
        const produto = await conexao.query('select * from produtos where id = $1', [id]);

        if (produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado");
        }

        return res.status(200).json(produto.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
}

async function cadastrarProduto(req, res){
    const { usuario } = req;
    const { nome, estoque, categoria, preco, descricao, imagem} = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.");
    }
    if (!estoque) {
        return res.status(400).json("O campo estoque é obrigatório.");
    }
    if (!preco) {
        return res.status(400).json("O campo preco é obrigatório.");
    }
    if (!descricao) {
        return res.status(400).json("O campo descricao é obrigatório.");
    }
    
    try {
        const queryCadastrarProduto = `insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) 
        values ($1, $2, $3, $4, $5, $6, $7)`;
        const produtoCadastrado = await conexao.query(queryCadastrarProduto, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if (produtoCadastrado.rowCount === 0) {
            return res.status(400).json("Não foi possivel cadastrar o produto");
        }

        return res.status(200).json("Produto cadastrado com sucesso.")
   
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
}

async function atualizarProduto(req, res){
    const { id: idProduto } = req.params;
    const { nome, estoque, categoria, preco, descricao, imagem} = req.body;

    try {
        const produto = await conexao.query('select * from produtos where id = $1', [idProduto]);

        if (produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado");
        }

        if (!nome && !estoque && !categoria && !preco && !descricao && !imagem) {
            return res.status(400).json("Informe os campos a serem alterados.");
        }
        
        if(nome){
            const queryNomeAtualizado = `update produtos set 
            nome = $1 
            where id = $2`;
            const nomeAtualizado = await conexao.query(queryNomeAtualizado, [nome, idProduto]);
        
            if (nomeAtualizado.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar o nome do produto");
            }

        }

        if(estoque){
            const queryEstoqueAtualizado = `update produtos set 
            estoque = $1 
            where id = $2`;
            const estoqueAtualizado = await conexao.query(queryEstoqueAtualizado, [estoque, idProduto]);
        
            if (estoqueAtualizado.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar o estoque do produto");
            }

        }

        if(categoria){
            const queryCategoriaAtualizada = `update produtos set 
            categoria = $1 
            where id = $2`;
            const categoriaAtualizada = await conexao.query(queryCategoriaAtualizada, [categoria, idProduto]);
        
            if (categoriaAtualizada.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar a categoria do produto");
            }

        }

        if(preco){
            const queryPrecoAtualizado = `update produtos set 
            preco = $1 
            where id = $2`;
            const precoAtualizado = await conexao.query(queryPrecoAtualizado, [preco, idProduto]);
        
            if (precoAtualizado.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar o preco do produto");
            }

        }

        if(descricao){
            const queryDescricaoAtualizada = `update produtos set 
            Descricao = $1 
            where id = $2`;
            const descricaoAtualizada = await conexao.query(queryDescricaoAtualizada, [descricao, idProduto]);
        
            if (descricaoAtualizada.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar a descricao do produto");
            }

        }

        if(imagem){
            const queryImagemAtualizada = `update produtos set 
            imagem = $1 
            where id = $2`;
            const imagemAtualizada = await conexao.query(queryImagemAtualizada, [imagem, idProduto]);
        
            if (imagemAtualizada.rowCount === 0) {
                return res.status(404).json("Não foi possível altualizar a imagem do produto");
            }

        }
    
        return res.status(200).json("O produto foi atualizado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
}

async function excluirProduto(req, res){
    const { id } = req.params;

    try {
        const produto = await conexao.query('select * from produtos where id = $1', [id]);

        if (produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado");
        }

        const query = 'delete from produtos where id = $1';
        const produtoExcluido = await conexao.query(query, [id]);

        if (produtoExcluido.rowCount === 0) {
            return res.status(404).json("Não foi possível excluir o produto");
        }

        return res.status(200).json("O produto foi excluido com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
};