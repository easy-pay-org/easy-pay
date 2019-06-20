import io from 'socket.io-client';

export class socketConfig {

    constructor(componentFn, table) {
        this.data = {}
        this.componentFn = componentFn;
        this.socket = io('https://app-easy-pay.herokuapp.com', { path: "/api/socket" });
        this.socket.emit('subscribe', table);



    }


    newMessage = (msg, table) => {

        this.socket.emit("send message", { msg, table })

    }







}