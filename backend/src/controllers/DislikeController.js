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
        

//Adicionar dados no array de likes
        loggedDev.dislikes.push(targetDev._id);

//Para salvar
        await loggedDev.save();

        return res.json(loggedDev);
    }
};