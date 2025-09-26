import Navbar from './Components/Navbar';
import Conversation  from './Components/Conversation';
import TextInput from './Components/TextInput';
import NoConnection from './Components/NoConnection';
import { useEffect, useState } from 'react';

//Importerar sockt för klienten
import {io} from "socket.io-client";


function App() {

  const[myMessages, addMessage] = useState([]); //useState för klientens medelanden

  const[recivedMessages, addRecivedMessages] = useState([]); //useState för mottagarens medelanden

  const[currentText, setCurrentText] = useState(""); //useState för texten som användaren skriver

  const[writing, currentlyWriting] = useState(false); //useState för att visa att den andra andändaren skirver något

  const[socket, setSocket] = useState(null); //useState för socket anslutninge

  const[dissconnected, setDissConnected] = useState(true); //useState för disconnect

  const[antalAnslutna, setAntalAnslutna] = useState(0); //useState för antal anslutana enheter

  useEffect(() => {

    //Ansluter till servern på porten 3000
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    //Loggar ut ett medelande vid anslutning
    newSocket.on("connect", () => {
      console.log("Connected with id: " + newSocket.id);
    })

    //Socket.on tar emot ett medelande från servern 
    newSocket.on("chat message", (msg) => {
      
      addRecivedMessages(prev => [...prev, msg]);
    });

    //Tar emot medelande för currentText
    newSocket.on("currentText", () => {
      console.log("Writing...");
      currentlyWriting(true);
    });

    //Tar emot medelande för noCurrentText
    newSocket.on("noCurrentText", () => {
      currentlyWriting(false);
    })

    //Lämmnar chatten när den andra väljer att lämna chatten
    newSocket.on("leaveChat", () =>{
      console.log("Other user left chat");
      clearMessage();
    })

    newSocket.on("dissconnected", () => {
      setDissConnected(false);
    });

    newSocket.on("Waiting", (connectedClients) => {
      console.log("Antal anslutna klienter: ", connectedClients);
      setAntalAnslutna(connectedClients);
    });

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
        time = houre + ":" + min;

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
        {dissconnected ? (<Conversation messages={myMessages} currentText={currentText} recivedMessages={recivedMessages} mySocketId={socket?.id} writing={writing} />): (<NoConnection />)}
      
        <TextInput returnMessage={returnMessage} returnCurrentText={returnCurrentText} antalAnslutna={antalAnslutna}/>
      
    </div>
  )
}

export default App;
