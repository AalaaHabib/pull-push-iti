import logo from './logo.svg';
import React ,{useState,useEffect} from 'react';
import PostData from './fetch.js'

import './App.css';

function App() {

  const [notifications,setNotifications] = useState([])
  const [message,setMessage]=useState('');
  
 /* const handleSubmit =  (e)=>{
    e.preventDefault();
    PostData('http://localhost:3000/msg',{message})
    

  } 
  const getNotifications= async ()=>{
    const id=Math.random()*1000
  const res = await  PostData('http://localhost:3000/msg/subscribe',{id});
  setNotifications(notifications.concat(res))
    setMessage('')
    console.log("response",res)
  }


  useEffect(() => {

       getNotifications();
    
  },[notifications]);*/
  /*************************Short pulling****************************** */
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
  await  PostData('http://localhost:3000/msg',{message,time: Date.now()})
    setMessage('')

  }
   useEffect(() => {
    setTimeout(async () => {      
      const response = await fetch(`http://localhost:3000/msg?last=${notifications.length > 0 ? notifications[notifications.length - 1].time : 0}`).then((res)=> res.json())
      setNotifications(notifications.concat(response))
    }, 5000);
  }, [notifications])

  return (
    <>
   <div className="form-wrapper">
     <form id="form" className="validate" onSubmit={handleSubmit}>
       <div className="form-field">
         <label>Message</label>
         <input type="text" name="message" id="message" onChange={((e)=>setMessage(e.target.value))} value={message} placeholder="message" required/>
       </div>
     </form>
   </div>
   
     <div>
       <h2>Messages  </h2>
       <ul className="check-list">
         {
           notifications.map((n,i)=><li key={i.toString()}>{n.message}</li>)
         }
       </ul>
     </div>
   
   </>
  );
}

export default App;
