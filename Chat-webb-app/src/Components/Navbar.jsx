
import NavbarModal  from "./NavbarModal";
import "../../style/style.css"

export default function Navbar({clearMessage}){

    return(
        <>
            <div className="row fixedTop">
                <div className="col">
                    <header className="header">
                        <div className="divCenter">
                            <h4 className="h1">Chat Star</h4>
                        </div>
                    </header>
                    <nav className="navbar">
                        <button className="newChatt" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">New chat</button>
                    </nav>
                    <NavbarModal clearMessage={clearMessage}/>
                </div>
            </div>
        </>
    );

}

