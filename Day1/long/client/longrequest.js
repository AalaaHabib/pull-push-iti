import React,{useState,useEffect} from 'react';
import postData from './helper/req';

const Polling=()=> {
    const [message,setMassege] =useState('');
    const [notifications,setNotifications]=useState([])
    
    const handleSubmit= async(e)=>{
        const start = Date.now();
        e.preventDefault();
        await postData('http://localhost:8000/messages',{message,start});
           console.log(message); 
        setMassege('');

    };
    useEffect(()=>{
    
        setTimeout(async()=>{
            let dateset=!notifications.length? 0 : notifications[notifications.length-1]['start'];
           const response=await fetch("http://localhost:8000/messages?data="+dateset)
           .then((res)=> res.json());
           console.log("mmaax",notifications[notifications.length -1]);
          setNotifications(notifications.concat(response));
         
        },5000);
    },[notifications])
    return (
      <div>
          <div>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Message</label>
                  <input type="text" name="message" placeholder="message" required 
                  onChange={((e)=>setMassege(e.target.value))} value={message} ></input>
              </div>
          </form>
          </div>
          
          <section>
              <div>
                  <h1>messages</h1>
                  <ul> 
                    {
                     notifications.map((n,i)=> <li key={i}>{n.start}</li>)
                    } 
                  </ul>
              </div>
          </section>

      </div>
    );
  }
  
  export default Polling;