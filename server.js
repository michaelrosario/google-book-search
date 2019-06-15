const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//const getApiAndEmit = "TODO"
//let interval;
io.on("connection", socket => {
  console.log("New client connected");
  /*if (interval) {
    clearInterval(interval);
  }*/
  //interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("FromAPI", (data)=>{
    //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
   console.log(data);
} ); 
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const environment = process.env.NODE_ENV || "development";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (environment === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//console.log("process.env",process.env);

// Connect to the Mongo DB
if (environment === "production") {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });
} 

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
