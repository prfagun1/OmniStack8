//Importar o axios
const axios = require('axios');
//Importar model Dev
const Dev = require('../models/Dev');

//Controle como um objeto
module.exports = {
    async index(req, res){
        const { user } = req.headers;
        
        const loggedDev = await Dev.findById(user);
        
        const users = await Dev.find({
//Irá aplicar todos os filtros com and
            $and:[
                { _id: { $ne: user} },
                { _id: { $nin: loggedDev.likes} },
                { _id: { $nin: loggedDev.dislikes} }
            ]
        })

        return res.json(users);
    },
//ne = not equal
//nin = not in

    async store(req, res){
//Pegar o objeto do método normal:
///     req.body.username

//Pegar o objeto usando desestruturação
        const { username } = req.body;

//Verificar se o usuário existe e retorna caso sim
        const userExists = await Dev.findOne({ user: username});
        if(userExists){
            return res.json(userExists);
        }

 //Acessar uma API pública com o axios
        const response = await axios.get(`https://api.github.com/users/${username}`);
//response.data = valor do retorno
///     console.log(response.data);

//Buscar os dados do response
        const { name, bio, avatar_url: avatar } = response.data;

//Criar um Dev com os objetos e armazenar em uma variável
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
}



/*
Métodos recomendados para um controller:
    Index - relatório
    Show - retornar 1 objeto
    Store - armazenar
    Update - atualizar
    Delete - apagar
*/