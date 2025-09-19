import Navbar from './Components/Navbar';
import Conversation  from './Components/Conversation';
import TextInput from './Components/TextInput';
import { useState } from 'react';

function App() {

  const[messages, addMessage] = useState([]);

  function returnMessage(inputMessage){
    console.log("Message from TextInput: ", inputMessage);

  
    

            const date = new Date();
            const houre = date.getHours();
            const min = date.getMinutes();
    
            const time = houre + ":" + min;


    addMessage(prev => [...prev, {text : inputMessage, time}]);
  }

  return (
    <div >
        <Navbar />

        <Conversation messages={messages}/>
      
        <TextInput returnMessage={returnMessage}/>
      
    </div>
  )
}

export default App;
