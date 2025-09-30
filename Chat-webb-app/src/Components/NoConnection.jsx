
import { useEffect, useState } from "react"
import "../../style/style.css"

export default function NoConnection({infoText}){

        const[text, setText] = useState("");


        useEffect(() => {
            console.log("infotext: ", infoText);
            setText(infoText)
        }, [infoText, setText])

    return(
        <div className="noConnection">
            <h3>{text}</h3>
        </div>
    )

}