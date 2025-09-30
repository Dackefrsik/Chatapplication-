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

    connectedClients ++;

    //Kontrolerar antalet anslutna klienter
    if(connectedClients > clientMax){
        console.log("Maximum clients reached. Denied connection: ", socket.id);
        //Skicakar medelande för att kunna skriva ut medelande om max antal anslutna
        socket.emit("dissconnected", false);
        socket.disconnect(true);
        return;
    }
    else if(connectedClients <= clientMax){
        console.log("Waiting for other user...");
        console.log("antal anslutna: ", connectedClients)
        io.emit("Waiting", connectedClients); //Skickar antal anslutna till alla enheter för att kunna uppdatera textarean
    }
   
    console.log("Klient anslöt", socket.id);

    //Tar emot ett chatmedelande
    socket.on("chat message", (msg) =>{
        socket.broadcast.emit("chat message", msg); //Skickar till alla utom avsändaren
    } )

    //Skickar medelande om att lämna chatten
    socket.on("leaveChat", () => {
        console.log("Socket disconnected: ", socket.id);
        connectedClients --;
        socket.broadcast.emit("leaveChat", connectedClients);  
        io.emit("waiting", connectedClients);
        socket.disconnect(); 

    });

    //Skickar medelande om att det finns en nuvarande text i inputrutan 
    socket.on("currentText", () => {
        console.log("Writing...");
        socket.broadcast.emit("currentText");
    });

    //Skickar medelande om att det inte finns någon nuvarande text i rutan
    socket.on("noCurrentText", () => {
        socket.broadcast.emit("noCurrentText");
    })

    //När en användare tappar anslutning eller stänger ner fliken
    socket.on("diconnect", () => {
        console.log("Socket Disconnected: ",  socket.id);
        if(connectedClients > 0){
            connectedClients--;
        }
        io.emit("leaveChat", connectedClients);
        io.emit("leaveChat", connectedClients);

    })

});

//Lysnar på servern
server.listen(3000, () => {
    console.log("Server is listening on port 3000...");
}); 

