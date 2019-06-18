import React, { Component } from 'react'
import { Message } from "./Message"
import { InputBox } from "./Input"

import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'

import styled from 'styled-components'
import io from "socket.io-client"
const socket = io(process.env.REACT_APP_URL, { path: "/api/socket" })



class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }



    componentDidMount() {

        const { messages } = this.state;
        console.log("Chat Ready");
        socket.on("front", msg => {
            console.log(`Mensaje del servidor: ${msg}`);
            messages.push({ type: "server", msg });
            this.setState({
                messages: messages
            })
            console.log(this.state)

        });
    }

    render() {
        const ChatWrapper = styled.div`
  border: 1px solid red;
  padding: 10px;
  width: 100%;`;


        return (
            <div>
                <TopNav user={this.props} />
                <div className='content'>

                    <ChatWrapper>
                        {this.state.messages.map(({ type, msg }, i) => (
                            <Message server={type === "server" ? true : false} key={i}>
                                {msg}
                            </Message>
                        ))}
                        <InputBox
                            newMessage={msg => {
                                socket.emit("mensajeria", msg);
                                this.state.messages.push({ type: "me", msg });
                                this.setState({
                                    messages: this.state.messages
                                })
                            }}
                        />
                    </ChatWrapper>

                </div>
                <BottomNav user={this.props.loggedInUser} />
            </div>
        )

    }

}

export default Chat