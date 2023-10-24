const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require("cors")
const database = require("./config/db")
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")
require('dotenv').config()
const path = require("path")

const { notFound, errorHandler } = require("./middleware/errorMiddleware")

database()
const app = express();
app.use(express.json())
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model('User', {
    name: String,
    email: String,
    mobile_number: String,
    gender: String,
    password: String
});

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)
// Move these lines above the notFound and errorHandler middleware


// Deployment
// const __dirname1 = path.resolve();
// console.log("__dirname1", __dirname1);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "Client/new-chat-app/build")));
//     app.get("*", (req, res) => {
//         const temp = path.join(__dirname1, "../", "Client/new-chat-app", "build", "index.html");
//         console.log("temp", temp);
//         res.sendFile(path.resolve(__dirname1, "../", "Client/new-chat-app", "build", "index.html"));
//     });
// } else {
//     app.get("/", (req, res) => {
//         res.send("api running successfully");
//     });
// }
const __dirname1 = path.resolve();
console.log("__dirname1", __dirname1);

if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname1, "../Client/new-chat-app/build");

    app.use(express.static(buildPath));
    
    app.get("*", (req, res) => {
        const indexPath = path.join(buildPath, "index.html");
        console.log("indexPath", indexPath);
        res.sendFile(indexPath);
    });
} else {
    app.get("/", (req, res) => {
        res.send("API running successfully");
    });
}

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

const server=app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin:"http://localhost:3001"
    }
    ,
});

io.on("connection", (socket) => {
    console.log("connected to socket io");
    socket.on("setup", (userData) => {
        socket.join(userData._id)
        console.log("user id is " + userData._id);
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("user joined chat is " + room)
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
      socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
})
