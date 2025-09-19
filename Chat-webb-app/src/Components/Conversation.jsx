export default function Converstaion({messages}){


    return (
     
            <>
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map(( m, i) => <div className="sentMessageDiv"><p key={i} className="sentMessage">{m.text}</p> <p className="messageTimer">{m.time}</p></div>) 
                ) : ( <p>Finns inga medelande...</p>
                )}
    
            </>
    )
}