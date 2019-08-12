//Importar o pacote express
const express = require('express');
//Importar o controller na rota
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController');
const DisLikeController = require('./controllers/DislikeController');

const routes = express.Router();

//Colocar o endereço que será ouvido na URL e qual função será executada
//Pode ser chamada como função javascript ou arrow function como abaixo
//Passar também a requisição e a resposta
//Esta rota foi criada como 'GET'
//Requisição: pega os parametros que foram passados
//Resposta: o que será devolvido pelo servidor
/*
routes.get('/', (req, res) => {
    ///Retornar uma resposta
    ///http://localhost:3333/?name=pablo
    ///Busca os parâmetros enviados por URL req.query.name
    
    ///Para retornar uma String: return res.send(`Ola ${req.query.name}`);
    
    ///Para retornar um json
    return res.json({message: `Ola ${req.query.name}`});
});
*/

//Para passar a requisição post para o Controller
routes.post('/devs', DevController.store);

//Busca uma informação no formato: http://localhost:3333/devs/5d4e1ee21f2dc44b208d5ff4/likes
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DisLikeController.store);
routes.get('/devs/', DevController.index);


//Recebe a requisição:
//{
//	"name": "Pablo Fagundes",
//	"email": "prfagun1@hotmail.com"
//}
//Exemplo de rota com post
/*
routes.post('/devs', (req, res) => {
    console.log(req.body.name);
    return res.json({ok: true});
});*/


//Exportar as rotas para serem reconhecidas pelo server
module.exports = routes;