// MercenaryEnrollForm과 FormField에서 사용되어 일관된 스타일을 제공
import styled from '@emotion/styled';


// 폼을 감싸는 컨테이너로, 레이아웃과 스타일을 정의한다.
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 70px;
`;

// 폼 제출 버튼의 스타일을 정의한다.
export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;


// 여러 메세지의 스타일을 정의한다.
export const ErrorMessage = styled.p`
  color: red;
  font-size: 10px;
  font-weight: bold;
  margin: 0;
`;
