import React,{useState,useEffect} from 'react';
import postData from './helper/req';


const Long=()=>{
    const [message,setMassege] =useState('');
    const [notifications,setNotifications]=useState([])
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        await postData('http://localhost:2300/messages',{message});
           console.log(message); 
        setMassege('');

    };
    const getNotification= async()=>{
        const id =Math.ceil(Math.random()*10000)
       const res=await postData('http://localhost:2300/messages/sebscribe',{id});
           console.log(res);
           setNotifications(notifications.concat(res));
           setMassege('');
        }
    useEffect(()=>{
        getNotification();

    },[notifications]);
    return(
        <>
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
                     notifications.map((n,i)=> <li key={i}>{n.message}</li>)
                    } 
                  </ul>
              </div>
          </section>
        </>
    )
}

export default Long;