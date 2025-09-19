
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
            <div className="row">
                <div className="col">
                    <header className="header">
                        <div className="divCenter">
                            <h4 className="h1">Chat Star</h4>
                        </div>
                    </header>
                    <nav className="navbar">
                        <button className="newChatt" onClick={newChat} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">New chat</button>
                    </nav>
                    {modalVisebility && <NavbarModal/>}
                </div>
            </div>
        </>
    );

}

