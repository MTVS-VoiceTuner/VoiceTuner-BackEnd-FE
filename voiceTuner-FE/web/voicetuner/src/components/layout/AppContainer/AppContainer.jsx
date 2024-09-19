
import styled from '@emotion/styled';

const AppContainer = styled.div`
  width: 90vw;
  max-width: 400px;
  height: 100vh;
  padding: 5vh 1vw;
  margin: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 70vh;
  position: relative;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 95vw;
    padding: 2vh 1vw;
  }

  @media (max-width: 480px) {
    width: 100vw;
    padding: 7vh 1vw;
  }
`;

export default AppContainer;
