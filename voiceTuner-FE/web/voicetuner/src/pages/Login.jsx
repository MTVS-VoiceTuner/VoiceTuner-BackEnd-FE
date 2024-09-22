import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { FormContainer, Button } from '../components/Basic';
import { InputField } from '../components/FormField';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Cookies from 'universal-cookie'; // 쿠키 관련 import 

// 쿠키 사용을 선언
const cookies = new Cookies();

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

// 로그인 API 호출 함수 정의 // 서버에 로그인 요청(이메일과 비밀번호 전송)
const UserLogin = async (email, password) => {

  try {
    // 서버에 로그인 요청
    // fetch : fetch는 브라우저에서 제공하는 API로, HTTP 요청을 서버에 보낼 수 있다. // URL, 전송방식(GET, POST), header(Content-Type), body(전달할 내용)
    const response = await fetch('http://localhost:8080/api/auth/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // body에 이메일, 비번을 보관하여 전달
    });

    // 서버가 보내준 response 중 json을 data변수에 저장
    const data = await response.json(); // response.json() : 서버에서 받은 HTTP 응답의 본문을 JSON 형식으로 변환하는 메서드

    if (!response.ok) { // response가 성공인지 확인 - 아니라면 예외처리
      throw new Error(data.message || '로그인에 실패했습니다.');
    }

    // 로그인 성공 시 받은 accessToken을 localStorage에 저장
    // localStorage : 브라우저의 저장소, 데이터를 키-값 쌍으로 영구적으로 저장할 수 있는 공간이다. 새로고침 해도 존재한다.
    // setItem(키, 값) : localStorage의 객체로 새로운 키-값 쌍을 저장하는 메서드

    // accessToken과 refreshToken 저장
    // localStorage.setItem('accessToken', data.response.accessToken); 
    setaccessTokenToCookie(data.response.accessToken); // 쿠키에 refreshToken 저장

    // 토큰이 저장됐는지 확인
    const storedToken = localStorage.getItem('accessToken');
    console.log('accessToken : ', storedToken);

    return data; // 로그인 성공 시 사용자 정보 또는 토큰을 반환

  } catch (error) {
    console.error('로그인 오류:', error.message);
    throw error;
  }
};

// 쿠키에 refreshToken을 저장하는 함수
export function setaccessTokenToCookie(accessToken) {
  cookies.set('accessToken', accessToken, {
    sameSite: 'strict',
    path: '/', 
  });
}

// 로그아웃 함수
export function logout() {
  console.log('localStorage set logout!');
  window.localStorage.setItem('logout', Date.now());
  cookies.remove('refreshToken'); // 쿠키에서 refreshToken 삭제
}

function LoginForm() {
  
  // useForm 훅을 사용해 폼 데이터를 처리한다.
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false); // 로그인 버튼 클릭 후 로딩 상태 관리
  const navigate = useNavigate(); // 로그인 성공 후 다른 페이지로 이동을 위한 네비게이션

  const onSubmit = async (data) => {

    setIsLoading(true);
    
    try {

      const userData = await UserLogin(data.email, data.password);

      console.log('로그인 성공:', userData);

      // 로그인 성공 후 결과 페이지로 이동
      navigate('/result');
    
    } catch (error) {

      // 로그인 실패 시 이메일 필드에 에러 메시지 설정
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