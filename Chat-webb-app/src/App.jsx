import Navbar from './Components/Navbar';
import Conversation  from './Components/Conversation';
import TextInput from './Components/TextInput';
import { useEffect, useState } from 'react';

//Importerar sockt för klienten
import {io} from "socket.io-client";

function App() {

  const[messages, addMessage] = useState([]);

  const[currentText, setCurrentText] = useState("");

  const[socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    setSocket(newSocket);

    newSocket.on("connect", () => {
    console.log("Connected with id: " + newSocket.id)
  })

  return () => {
    newSocket.disconnect();
    console.log("Disconnected socket");
  }

  }, []);


  function returnMessage(inputMessage){
    console.log("Message from TextInput: ", inputMessage);

      const date = new Date();
      const houre = date.getHours();
      const min = date.getMinutes();

      const time = houre + ":" + min;

    addMessage(prev => [...prev, {text : inputMessage, time}]);
  }

  function clearMessage(){
    addMessage([]);
    console.log(messages.length)
  }
  
  function returnCurrentText(inputCurrentText){
    setCurrentText(inputCurrentText);
  }

  return (
    <div >
        <Navbar clearMessage={clearMessage}/>

        <Conversation messages={messages} currentText={currentText}/>
      
        <TextInput returnMessage={returnMessage} returnCurrentText={returnCurrentText}/>
      
    </div>
  )
}

export default App;
