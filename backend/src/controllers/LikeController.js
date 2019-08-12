const Dev = require('../models/Dev')

module.exports = {
    async store(req, res){

//Para acessar um parâmetro da rota
        //console.log(req.params.devId);

//Para buscar um header
        //console.log(req.headers.user);

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

//Caso o dev não exista retorna status 400
        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists'});
        }
        
//Verificar se o like é mutuo
        if(targetDev.likes.includes(loggedDev._id)){
//É preciso avisar os dois que deu match
                const loggedSocket = req.connectedUsers[user];
                const targetSocket = req.connectedUsers[devId];

                if(loggedSocket){
                        //Envia para um socket especifico
                        req.io.to(loggedSocket).emit('match', targetDev);
                }

                if(targetSocket){
                        //Envia para um socket especifico
                        req.io.to(targetSocket).emit('match', loggedDev);
                }
        }

//Adicionar dados no array de likes
        loggedDev.likes.push(targetDev._id);

//Para salvar
        await loggedDev.save();

        return res.json(loggedDev);
    }
};