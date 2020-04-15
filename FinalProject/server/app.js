const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./user');

var OnlineUser = []


const app = express();
app.use(bodyParser.json());
app.use(cors())

const server = app.listen(3000);
const io = require('./socket').init(server);
io.on('connection', socket => {
    socket.on('username',username => {
        OnlineUser.push(new User(username,socket.id))
        console.log(OnlineUser);
        setTimeout(() => socket.broadcast.emit("join_server",username),0);
    });
    socket.on('disconnect', () => {
        let index = OnlineUser.findIndex(user => user.id == socket.id);
        if(index != -1){
            //console.log(OnlineUser[index].username);
            socket.broadcast.emit("leave_server",OnlineUser[index].username);
            OnlineUser.splice(index,1);
        }
        //console.log(OnlineUser, "OUT");
    });
})