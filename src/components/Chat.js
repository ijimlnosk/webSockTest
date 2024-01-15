import './Chat';

import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const { useState, useEffect, useRef } = require('react');

const socket = io('http://49.165.177.17:3000');

const Chat = () => {
    const location = useLocation();
    const { roomName, name } = location.state || {};

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    useEffect(() => {
        if (roomName) {
            socket.emit('join room', roomName);
            console.log(roomName);
        }

        const messageHandler = msg => {
            setChat(prev => [...prev, msg]);
        };

        socket.on('chat message', messageHandler);

        return () => {
            socket.off('chat message', messageHandler);
            if (roomName) {
                socket.emit('leave room', roomName);
            }
        };
    }, [roomName]);

    const sendMessage = e => {
        e.preventDefault();
        const newMessage = { roomName: roomName, user: name, text: message };
        socket.emit('chat message', newMessage);
        setMessage('');
        setChat(prev => [...prev, newMessage]);
    };

    return (
        <>
            <Wrapper>
                <Container>
                    <Ul>
                        {chat.map((msg, index) => (
                            <Li key={index} isUserMessage={msg.user === name}>
                                {msg.user !== name && <span>{msg.user}</span>}
                                <MessageText isUserMessage={msg.user === name}>
                                    {msg.text}
                                </MessageText>
                            </Li>
                        ))}
                        <div ref={messagesEndRef} />
                    </Ul>
                </Container>
                <SForm onSubmit={sendMessage}>
                    <Input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="메세지 입력"
                    />
                    <Button type="submit">전송</Button>
                </SForm>
            </Wrapper>
        </>
    );
};
export default Chat;

const Wrapper = styled.div`
    width: 1000px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 500px) {
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

const Container = styled.div`
    width: 600px;
    height: 500px;
    overflow: auto;
    @media (max-width: 500px) {
        width: 250px;
        height: 400px;
        overflow: auto;
    }
`;

const Ul = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`;

const Li = styled.li`
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.isUserMessage ? 'flex-end' : 'flex-start')};
    margin: 0 30px;
    margin-bottom: 5px;
    @media (max-width: 500px) {
        margin: 0 10px;
    }
`;

const MessageText = styled.span`
    background-color: ${props => (props.isUserMessage ? '#E180E3' : '#E5D9FF')};
    padding: 5px;
    border-radius: 8px;
    margin-left: 5px;
    max-width: 80%;
    word-wrap: break-word;

    @media (max-width: 500px) {
        max-width: 80%;
    }
`;

const Input = styled.input`
    width: 500px;
    height: 80px;
    padding-left: 10px;
    @media (max-width: 500px) {
        width: 200px;
        height: 30px;
    }
`;

const Button = styled.button`
    width: 40px;
    height: 40px;
    margin-left: 10px;
    border: none;
    border-radius: 8px;
    background-color: #bcb2d7;
    &:hover {
        background-color: #9517a0;
    }
`;

const SForm = styled.form`
    display: flex;
    flex-direction: row;
`;
