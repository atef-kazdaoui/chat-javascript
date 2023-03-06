const { Socket } = require("socket.io");

//on instancie expres
const app = require("express")();
// on créé le serveur http
const http = require("http").createServer(app);
//on instancie socket.io
const io=require("socket.io")(http)
// oncréé la route /
app.get("/", (req,res) =>{
    res.sendFile(__dirname+"/index.html")


})
//on ecoute l'evenement "connexion" de socket.io
io.on("connection",(socket)=>{ 
 console.log("une connextion s'active");

 //on ecoute la deconnexion
 socket.on("disconnect",()=>{
    console.log("un utlisiateur est deconnecte");
 });
 //la on va gérer le chat 
  socket.on("chat_message",(msg)=>{
    //on relaie le message vers tout les utilisateurs 
   io.emit("chat_message",msg) 
  });
});

// on  va demander au serveur http de répondre sur le port 3000
http.listen(3000, ()=>{
 console.log("j'ecoute le port 3000");
 

});