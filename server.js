const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Express Api ♠</h1>");
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_messgae", (data) => {
    // console.log(data);
    socket.to(data.room).emit("recieve_message", data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => console.log(`Running on port ${port}`));

/*// const studentRouter = require('./routes/student.route')
// const userRouter = require('./routes/user.route')
// app.use('/', studentRouter)
// app.use('/', userRouter)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
*/

// io.on("connection", (socket) => {
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     console.log(data);
//   });
// });
