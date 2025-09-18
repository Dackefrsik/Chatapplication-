
import { useState } from "react";
import NavbarModal  from "./NavbarModal";
import "../../style/style.css"

export default function Navbar(){

    const [modalVisebility, setModalVisibility] = useState(false)

    function newChat() {
        setModalVisibility(true);
        console.log("Hej");

        console.log(modalVisebility)
    }

    return(
        <>
            <header className="header">
                <div className="divCenter">
                    <h1 className="h1">Chat Star</h1>
                </div>
                <nav className="navbar">
                    <button className="newChatt" onClick={newChat} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">New chat</button>
                </nav>

                

            </header>
            {modalVisebility && <NavbarModal/>}
        </>
    );

}

