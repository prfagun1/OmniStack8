//Importar o pacote express
const express = require('express');

//Importar o driver de banco antes das rotas
const mongoose = require('mongoose');

//Importar cors
const cors = require('cors');

//Importar o arquivo de rotas
const routes = require('./routes');

//Criar servidor para receber as respostas
const app = express();

//Importar o módulo http padrão do node
const server = require('http').Server(app);

//Importar a biblioteca para usar o websocket io e faz com ela receba wss e http
const io = require('socket.io')(server);

//Será feito dessa forma para laboratório, o ideal é usar um banco
const connectedUsers = {
//ID usuário e ID socket
    
}

//Recebe as mensagens dos clientes
io.on('connection', socket =>{

//Buscar parâmetros enviados do cliente
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;

    console.log(user, socket.id);
//É preciso armazenar os IDs dos usuários para enviar a mensagem para o ID correto

/*  
///Recebe mensagem do cliente  
    console.log('Nova conexão', socket.id);
    socket.on('hello', message => {
        console.log(message);
    });

///Envia mensagem para o cliente
    setTimeout(() => {
        socket.emit('world', {
            message: 'Vai cliente!!!'
        });
    }, 3000);*/
});

//Conectar ao banco
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-xo8lw.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

//Para enviar informações para Controllers usar midleware, executa o processo depois envia para próxima execução
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})


//Dizer para o servidor reconhecer json (antes das rotas)
app.use(express.json());

//Dizer para o servidor reconhecer cors (antes das rotas)
app.use(cors());

//Usar as rotas importadas
app.use(routes);

//Iniciar o servidor em uma porta
server.listen(3333);


