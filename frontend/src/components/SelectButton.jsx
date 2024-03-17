import React from 'react';
import styled, { css } from 'styled-components';

// 선택된 상태에 따라 스타일이 변경되도록 스타일드 컴포넌트를 정의합니다.
export const SelectButton = styled.button`
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;

  /* 선택된 상태에 따라 스타일 변경 */
  ${(props) =>
    props.selected
      ? css`
          background-color: #007bff;
          &:hover {
            background-color: #0056b3;
          }
        `
      : css`
          background-color: #333;
          &:hover {
            background-color: #555;
          }
          opacity: 0.7; /* 선택되지 않은 상태일 때 흐려지도록 함 */
        `}
`;