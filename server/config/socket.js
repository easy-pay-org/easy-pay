const Table = require("../models/restaurant.model");
module.exports = (server, url) => {

  const io = require('socket.io')(server, { path: url });

  // Room.find().select("room")
  // .then(room => {
  // console.log(room)
  io.on("connection", (socket) => {
    console.log("Connect");

    socket.on('subscribe', function (table) {
      console.log('Tablesssss', table)
      console.log('joining room', `${table.table} ${table.num}`);
      socket.join(`${table.table} ${table.num}`);
    });

    socket.on('send message', function ({ table, msg }) {
      console.log(table)
      console.log('sending table post', `${table.table} ${table.num}`);
      io.sockets.in(`${table.table} ${table.num}`).emit('subasta!', {
        message: msg.message || msg
      });
    });

    socket.on("mensajeria", m => {
      console.log(`NUEVO MENSAJE: ${m}`);
      socket.broadcast.emit("front", m);
    });
  })
  // })




}