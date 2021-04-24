const cors=require('cors');
const express = require('express')
const app = express();
const port = 2300;

app.use(cors());
app.use(express.json());

const messages=[];

// app.post('/messages',(req,res)=>{
//      //const{body}=req;
//      console.log(req.body);
//      messages.push(req.body);
//      res.status(204).end();
// });
// app.get('/messages/data/:id',(req,res)=>{

//   const queryObject = url.parse(req.url,true).query;
//   res.send(messages[0]);
//   console.log(queryObject.start);
//     // var data=req.param('data');
//     // messages.find({start})
//     // res.send(req.params)
// });
const subscribers={};

app.post('/messages/sebscribe',(req,res)=>{
    const {id}=req.body;
    console.log(id);
    subscribers[id]=res;
    req.on('close',()=>{
      console.log(id,'Close');
      delete subscribers[id];
    })
    // Object.keys(subscribers).forEach((subscriberID)=>{
    //     subscribers[subscriberID].json(body);
    //     delete subscribers[subscriberID];
    // });
    // res.status(204).end(); 
});
app.post('/messages',(req,res)=>{
  console.log(req.body);
  Object.entries(subscribers).forEach(([id,response])=>{
    delete subscribers[id];
    response.json(req.body);
  });
  res.status(204).end();
});
app.get('/subscribe/:id',(req,res)=>{
    const {id}=req.params;
    console.log(id);
    subscribers[id]=res;


});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});