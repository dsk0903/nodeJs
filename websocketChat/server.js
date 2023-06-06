const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const PORT = 8080;
const io = socketio.listen(server);


app.get("/", (req, res) => {
    fs.readFile("./chat.html", (error, data) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

io.sockets.on("connection", (socket) => {
    socket.on("message", (data) => {
        io.sockets.emit("message", data);
    });
});

server.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});