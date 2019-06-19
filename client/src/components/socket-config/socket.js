import io from 'socket.io-client';

export class socketConfig {

    constructor(componentFn, table) {
        this.data = {}
        this.componentFn = componentFn;
        this.socket = io('http://localhost:3000', { path: "/api/socket" });
        this.socket.emit('subscribe', table);
        


    }


    newMessage = (msg, table) => {

        this.socket.emit("send message", { msg, table })

    }







}