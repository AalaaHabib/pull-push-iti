 const express = require("express");

 const app = express();
const PORT = process.env.PORT || 8000;
const core = require('cors');
 app.use(express.json());
 app.use(core());


const http= require('http');
const server=http.createServer();
const io=require('socket.io')(server,{
    cors:{
        origin: '*',
        method: '*',
    },
});

io.on('connection',(socket)=>{
    console.log('New Connection',socket.id)
    socket.on('message',(message)=>{
        console.log(message);
        if(message.id) 
            io.to(message.id).emit('message',message);
        socket.broadcast.emit('message',message);
    });
});


server.listen(PORT, (err) => {
    if (err) console.error("hhhhhhhhhhhhhhhh", err);
    console.info(`App server is running and listening on port ${PORT}`);

});