import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RoomSelectionPage = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        navigate('/chat', {
            state: { roomName: selectedRoom, name: nickname },
        });
    };

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Enter your nickname:
                    <Input
                        type="text"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                </Label>
                <Label>
                    Choose a room:
                    <Select onChange={e => setSelectedRoom(e.target.value)}>
                        <option value="">Select a room</option>
                        <option value="Room1">Room 1</option>
                        <option value="Room2">Room 2</option>
                        {/* Add more rooms as needed */}
                    </Select>
                </Label>
                <Button type="submit" disabled={!nickname || !selectedRoom}>
                    Join Room
                </Button>
            </Form>
        </Wrapper>
    );
};

export default RoomSelectionPage;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const Input = styled.input`
    margin-left: 10px;
`;

const Select = styled.select`
    margin-left: 10px;
`;

const Button = styled.button`
    margin-top: 20px;
`;
