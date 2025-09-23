export default function Converstaion({messages, recivedMessages, mySocketId, writing}){

    //Kombinerar de två vektorerna med medelanden
    const allMessages = [...messages, ...recivedMessages];

    //Sorterar de på tid
    allMessages.sort((a , b ) => {
        console.log( allMessages)
        return a.time.localeCompare(b.time);
    })

    return (
     
            <div className="conversationDiv">
                {Array.isArray(allMessages) && allMessages.length > 0 ? (
                    allMessages.map(( m, i) => {
                    
                        //Skiftar klass beroende på vem som skickat medelandet
                        //Behöver en extra return fär att lopen (map) måste returnera något
                        return(   
                        <div className={m.socketID === mySocketId ? "sentMessageDiv" : "recivedMessageDiv"}>
                            <p key={i} className={m.socketID === mySocketId ? "sentMessage" : "recivedMessage"}>{m.text}</p> 
                            <p className={m.socketID == mySocketId ? "messageTimer" : "messageTimerRight"}>{m.time}</p>
                        </div>
                    )}
                    
                )
                ) : ( <h5 className="noMessage">Finns inga medelande...</h5>
                )}

                {writing && 
                <div className="typingIconRight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chat-right-dots" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                </div>}
            </div>
    )
}