
import styled from '@emotion/styled';
import alarmIcon from '@/assets/alarm.svg';
import messageIcon from '@/assets/message_square.svg';
import logoIcon from '@/assets/soccerball.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
  margin: 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logoIcon} alt="FootLog Logo" />
        <Title>FootLog</Title>
      </LogoContainer>
      <IconContainer>
        <IconButton>
          <img src={alarmIcon} alt="알림" />
        </IconButton>
        <IconButton>
          <img src={messageIcon} alt="채팅" />
        </IconButton>
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
