'use client';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// styled-components 방식
const StyledButton = styled.button`
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// css prop 방식
const ExampleEmotionComponent = () => {
  return (
    <div
      css={css`
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
      `}
    >
      <h1
        css={css`
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1rem;
        `}
      >
        Emotion 스타일링 예제
      </h1>

      <p
        css={css`
          font-size: 1rem;
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        `}
      >
        Emotion이 정상적으로 설정되었습니다. CSS-in-JS 방식으로 스타일링을 할 수
        있습니다.
      </p>

      <div
        css={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <StyledButton>Styled Button</StyledButton>

        <button
          css={css`
            padding: 12px 24px;
            background-color: #8b5cf6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: #7c3aed;
              transform: translateY(-2px);
            }

            &:active {
              transform: translateY(0);
            }
          `}
        >
          CSS Prop Button
        </button>
      </div>
    </div>
  );
};

export default ExampleEmotionComponent;
