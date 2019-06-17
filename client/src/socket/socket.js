import io from 'socket.io-client';

export class socketConfig {

    constructor(componentFn, table) {
        this.componentFn = componentFn;
        this.socket = io("http://localhost:3000", { path: "/api/socket" });
        this.socket.emit('subscribe', table);

        // this.socket.emit('send message', {
        //     room,
        //     message: room
        // });
        this.socket.on('subasta!', function (data) {
            //display data.message
            console.log(data)
        });
    }


    newMessage = (msg, table) => {
        console.log(table)
        this.socket.emit("send message", { table, msg })
    }
}