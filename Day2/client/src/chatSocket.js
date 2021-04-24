import {useState,useEffect,useMemo} from 'react';
import io from 'socket.io-client';
import {Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const Base_Url='http://localhost:8000';

const socket=io(Base_Url);



const Ws=()=>{

    const [myValue, setMyValue] = useState('');
    


    const handleNewUserMessage=(message)=>{
        console.log(message);
        socket.emit('message',{id:myValue, message:message});
    };
    useEffect(()=>{
        socket.on('message',(message)=>{
            addResponseMessage(message.message);
        });
    },[]);
    console.log(myValue)
    return(
        <div className="WS">
     
            <p>Enter user id</p>
            <input
              value={myValue}
              onChange={(e) => {setMyValue(e.target.value)}}
            />
      
    <Widget 
        handleNewUserMessage={handleNewUserMessage}
    />
    </div>
    );
};
export default Ws;