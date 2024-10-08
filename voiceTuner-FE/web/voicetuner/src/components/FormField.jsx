import styled from '@emotion/styled';
import { ErrorMessage } from './Basic';

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  width: auto;
  margin: 0 10px;
`;

// 텍스트, 숫자, 날짜 등의 입력을 받는 필드
// 텍스트, 숫자, 날짜 등의 입력을 받는 필드
export function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  onChange,
  value,
  disabled = false // 새로 추가된 disabled 속성 (기본값 false)
}) {
  return (
    <InputLabel htmlFor={id}>
      {label}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register} // React Hook Form의 필드 등록
        value={value} // 외부에서 전달된 value
        onChange={onChange} // 외부에서 전달된 onChange 핸들러
        disabled={disabled} // disabled 속성 추가
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}
