const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors()); // middleware

const PORT = process.env.PORT || 3001;

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

  io.on('connection', socket => {
    socket.on('fromReact', title => {
      console.log("fromReact",title);
      socket.broadcast.emit('fromServer', { data : title.data });
    });
  });} 


// Start the API server
http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});



