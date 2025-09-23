import Navbar from './Components/Navbar';
import Conversation  from './Components/Conversation';
import TextInput from './Components/TextInput';
import { useEffect, useState } from 'react';

//Importerar sockt för klienten
import {io} from "socket.io-client";

function App() {

  const[myMessages, addMessage] = useState([]);

  const[recivedMessages, addRecivedMessages] = useState([]);

  const[currentText, setCurrentText] = useState("");

  const[writing, currentlyWriting] = useState(false);

  const[socket, setSocket] = useState(null);

  useEffect(() => {

    //Ansluter till servern på porten 3000
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    //Loggar ut ett medelande vid anslutning
    newSocket.on("connect", () => {
      console.log("Connected with id: " + newSocket.id)
    })

  //Socket.on tar emot ett medelande från servern 
  newSocket.on("chat message", (msg) => {
    
    addRecivedMessages(prev => [...prev, msg]);
  });

  newSocket.on("currentText", () => {
    console.log("Writing...");
    currentlyWriting(true);
  });

  newSocket.on("noCurrentText", () => {
    currentlyWriting(false);
  })

  //Lämmnar chatten när den andra väljer att lämna chatten
  newSocket.on("leaveChat", () =>{
    console.log("Leaving chat");
    newSocket.disconnect();
    clearMessage();
  })

  //Säkllerställer att bara en enhet ansluter när klienten anluter
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
      let time = "";

      if(min <= 9){
        time = houre + ":0" + min;
      }
      else{
        time = houre + min;

      }

      addMessage(prev => [...prev, {text : inputMessage, time, socketID : socket.id}]);

      const messageObject = { text: inputMessage, time, socketID : socket.id};

      //Socket.emit skickar medelanden 
      socket.emit("chat message", messageObject);
  }

  function clearMessage(){
    addMessage([]);
    addRecivedMessages([]);

    if(socket?.connected){
      console.log("leaving chat...");
      socket.emit("leaveChat"); //Lämnar chatten
    }
 
  }
  
  function returnCurrentText(inputCurrentText){
    if(inputCurrentText.length > 0){
      setCurrentText(inputCurrentText);
      socket.emit("currentText");
    }
    else{
      setCurrentText("");
      socket.emit("noCurrentText");
    }

  }

  return (
    <div >
        <Navbar clearMessage={clearMessage}/>

        //Socket?.id gör att det kan skicka ett id på socket som är undefined utan att programmet krachar
        <Conversation messages={myMessages} currentText={currentText} recivedMessages={recivedMessages} mySocketId={socket?.id} writing={writing}/>
      
        <TextInput returnMessage={returnMessage} returnCurrentText={returnCurrentText}/>
      
    </div>
  )
}

export default App;
