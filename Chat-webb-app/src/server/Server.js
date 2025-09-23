//importerar relevanta moduler
import express from "express";
import http from "http";
import {Server} from "socket.io";

//Skapar en express app, möjliggör definieringen av rputs (app.get/ app.post)
const app = express();

//Skapar https servern
const server = http.createServer(app);

//Sätter upp en socket.io server 
const io = new Server(server, {
    cors:{
        origin: "*", // * Låter alla enheter på nätverket ansluta
        methods: ["GET", "POST"],

    },
});

//Regler för antalet som kan ansluta
const clientMax = 2;
let connectedClients = 0;

//Sköter anslutningar till servern 
io.on("connection", (socket) => {

    //Kontrolerar antalet anslutna klienter
    if(connectedClients >= clientMax){
        console.log("Maximum clients reached. Denied connection: ", socket.id);
        socket.disconnect(true);
        return;
    }
    
    connectedClients ++;
    console.log("Klient anslöt", socket.id);

    socket.on("chat message", (msg) =>{

       //msg.senderId = socket.id; //Adderar en ytterligare parameter för att kunna särskilja dem åt och lägga på var sin sida av skärmen
        
        socket.broadcast.emit("chat message", msg); //Skickar till alla utom avsändaren
    } )

    socket.on("leaveChat", () => {
        console.log("Socket disconnected: ", socket.id);
        connectedClients --;
        socket.broadcast.emit("leaveChat");
        socket.disconnect();   

    })


});




//Lysnar på servern
server.listen(3000, () => {
    console.log("Server is listening on port 3000...");
}); 

