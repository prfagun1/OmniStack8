//Importar objetos do mongoose
const { Schema, model } = require('mongoose');

//Criar objeto Nome do schema
const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
//Quando não é obrigatório pode ser declarado diretamente
    bio: String,
    avatar: {
        type: String,
        required: true
    },
//Vetores[] de likes com ID (como se fosse um relacionamento de banco relacional)
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
//Irá criar colunas automáticas para cada registro com os nomes 'createdAt' e 'updatedAt'
    timestamps: true,
})

//Exportar módulo criado
module.exports = model('Dev', DevSchema);