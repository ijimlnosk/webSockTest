import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState();

    const onClick = e => {
        e.preventDefault();
        const nickName = e.target.nickName.value;
        setName(nickName);
        navigate('/chat', { state: { name: nickName } });
    };

    return (
        <>
            <Styled.Wrapper onSubmit={onClick}>
                <div>닉네임 입력</div>
                <input type="text" name="nickName" />
                <button>확인</button>
            </Styled.Wrapper>
        </>
    );
};
export default MainPage;

const Wrapper = styled.form`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Styled = {
    Wrapper,
};
