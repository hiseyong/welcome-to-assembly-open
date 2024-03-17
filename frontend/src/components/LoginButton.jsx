import styled from 'styled-components';

// 버튼 스타일드 컴포넌트를 정의합니다.
const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 200px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

// Button 컴포넌트를 정의합니다.
export const LoginButton = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};