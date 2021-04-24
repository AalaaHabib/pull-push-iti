const http=require('http')
// const express=require('express')
// const app=express()
const server=http.createServer()
const io=require('socket.io')(server,{
    cors:'*',
    methods:'*'
})
io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('message',(message)=>{
        console.log(message);
        io.broadcast.emit('new-msg',message)
    })
})


server.listen(3000,()=>{
    console.log('Server listening on port 3000');
})