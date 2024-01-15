import Chat from './Chat';

const ChatRoom = ({ roomName }) => {
    return (
        <div>
            <h2>{roomName}</h2>
            <Chat roomName={roomName} />
        </div>
    );
};

export default ChatRoom;
