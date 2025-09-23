

export default function NavbarModal({clearMessage}){

    function clearChat(){
        
        clearMessage();

    }

    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Leave chat?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>This will turminate current chat</p> 
                    <p> Are you sure?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={clearChat} data-bs-dismiss="modal">Leave chat</button>
                </div>
                </div>
            </div>
        </div>
    )
}