import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { FormContainer, Button } from '../components/Basic';
import { InputField } from '../components/FormField';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

// 제목 스타일링
const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #16C79A;
  margin-bottom: 20px;
`;

export const SearchButton = styled.button`
  flex-grow: 1;
  padding: 10px 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

// 로그인 API 호출 함수 정의 // 서버에 로그인 요청
const UserLogin = async (email, password) => {
  // 실제 API 호출 로직을 여기에 추가합니다.
  // 예를 들어, fetch 또는 Axios를 사용하여 API에 요청을 보냅니다.
  
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
     
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // body에 이메일, 비번을 보관하여 전달
    });

    const data = await response.json(); // 서버가 보내준 응답 저장

    if (!response.ok) { // 200 상태가 아니면 로그인 실패

      throw new Error(data.message || '로그인에 실패했습니다.');
    }

    return data; // 로그인 성공 시 사용자 정보 또는 토큰을 반환

  } catch (error) {
    console.error('로그인 오류:', error.message);
    throw error;
  }
};

function LoginForm() {
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate를 호출하여 navigate 변수 정의


  const onSubmit = async (data) => {

    setIsLoading(true);
    
    try {

      const userData = await UserLogin(data.email, data.password);

      console.log('로그인 성공:', userData);

      // 로그인 성공 후 결과 페이지로 이동
      navigate('/result');
    
    } catch (error) {
      setError('email', { message: '로그인 실패: 이메일 또는 비밀번호를 확인하세요.' });
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <FormContainer>
      <Title>로그인</Title> {/* 가운데 정렬되고 강조된 제목 */}

      {/* 이메일 입력 창 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="email"
          label="이메일"
          register={register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일 주소를 입력해주세요.',
            },
          })}
          error={errors.email?.message}
        />

        {/* 비밀번호 입력 창 */}
        <InputField
          id="password"
          label="비밀번호"
          type="password"
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
            message: '유효한 이메일 주소를 입력해주세요.',
          })}
          error={errors.password?.message}
        />

        {/* 로그인 버튼 */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>

      </form>
    </FormContainer>
  );
}

export default LoginForm;