import Navbar from './Components/Navbar';
import Conversation  from './Components/Conversation';
import TextInput from './Components/TextInput';
import { useState } from 'react';

function App() {

  const[messages, addMessage] = useState([]);

  const[currentText, setCurrentText] = useState("");

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
