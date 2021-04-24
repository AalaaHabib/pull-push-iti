const PORT = process.env.PORT || 3000
const express = require('express');
const cors = require ('cors');
const { response } = require('express');

const app = express();

app.use(cors())
app.use(express.json())
app.listen(PORT, (err) => {
    if (err) console.error(err)
    else console.log(`Server Started On Port : ${PORT}`)
})
/*const subscribers={}
app.post('/msg/subscribe',(req,res)=>{
  const {id}=req.body;
  console.log(id)
subscribers[id]=res;
req.on('close',()=>{
  delete subscribers[id];
})

})
app.post('/msg',(req,res)=>{
  console.log(req.body)
  Object.entries(subscribers).forEach(([id,response])=>{
    delete subscribers[id]
    response.json(req.body);
  })
  res.status(204).end();
})*/

//***************************Short pulling*************************************************************** */
 const messages = []

 app.get('/msg',(req,res,next)=>{
 
  const last = req.query.last
 
  if (last === 0 || last === undefined) 
  {
      console.log(messages)
      res.json(messages);
  }
  else 
  {
      console.log("hi")
      const filteredMessage = messages.filter((message)=>{
          if (message.time > last) {
              return message
          }
      })
      res.json(filteredMessage)
      console.log(filteredMessage)
  }
})


app.post('/msg',async(req, res)=>{
  try
  {
      messages.push(req.body);
      console.log(messages)
      res.json({status: "Ok"});
  }
  catch(e)
  {
      
  }
})

