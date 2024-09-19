import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { FormContainer, Button } from '../components/Basic';
import { InputField } from '../components/FormField';

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

// 로그인 API 호출 함수 정의
const loginUser = async (email, password) => {
  // 실제 API 호출 로직을 여기에 추가합니다.
  // 예를 들어, fetch 또는 Axios를 사용하여 API에 요청을 보냅니다.
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = await loginUser(data.email, data.password);
      console.log('로그인 성공:', userData);
      // 로그인 성공 후, 필요한 동작을 수행합니다.
      // 예: 페이지 이동, 사용자 상태 업데이트 등
    } catch (error) {
      setError('email', { message: '로그인 실패: 이메일 또는 비밀번호를 확인하세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>로그인</Title> {/* 가운데 정렬되고 강조된 제목 */}

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

        <InputField
          id="password"
          label="비밀번호"
          type="password"
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상이어야 합니다.',
            },
          })}
          error={errors.password?.message}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </FormContainer>
  );
}

export default LoginForm;