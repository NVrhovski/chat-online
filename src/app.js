import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js'

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use('/static', express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.get('/getHistory', (req, res) => {
    res.send(JSON.stringify(messages))
})

const httpServer = app.listen(PORT);
const wsServer = new Server(httpServer);

let messages = [];

wsServer.on('connection', (socket) => {

    socket.on('client_message_sent', (data) => {
        messages.push(JSON.parse(data));
        wsServer.emit('server_message_sent', JSON.stringify(messages));
    })

})