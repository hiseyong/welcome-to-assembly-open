import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  width: 300px;
`;

const InputLabel = styled.label`
  margin-top: 10px;
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  color: #333;
  width: 300px;
  text-align: left;
  font-family: "Noto Sans KR", sans-serif;
`;

export const LoginInput = ({ label, ...rest }) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <StyledInput {...rest} />
    </div>
  );
};