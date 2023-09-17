const express = require("express");
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path')
const cookieParser = require('cookie-parser');
const { formatMessage } = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const {passport}=require("./config/google.oauth");




const { connection } = require("./database/db");
const { redis } = require("./database/redis");
const { userRoute } = require("./routes/user.route");
const { feedRouter } = require("./routes/feedback.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });


app.get("/", (req,res)=>{
    res.send("base point")
})


app.use("/user", userRoute)
app.use("/feed",feedRouter)

app.use(express.static('public'));
app.get('/friendchess', function (req, res) {
    // res.redirect('/public/chess-ai-main/index.html')
    res.sendFile(__dirname + '/public/index.html');
})


app.all("*", (req, res) => {
    res.status(404).send({
        "error": `404 ! Invalid URL Detected.`
    })
})



const server = http.createServer(app);

server.listen(process.env.port, async () => {
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.port}`);
})
let botName = "ChatBot"
// socket app
const io = new Server(server);
io.on('connection', (socket) => {

    socket.on('join-room', (data) => {
        const user = userJoin(socket.id, data.username, data.room);
        socket.join(user.room);
        socket.emit('message', formatMessage(botName, "Welcome to chess chat"));
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        //send user details
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    socket.on('chatMsg', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    })

    socket.on('move', function (msg) {
        const user = getCurrentUser(socket.id);
        socket.broadcast.to(user.room).emit('move', msg);
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    })
})