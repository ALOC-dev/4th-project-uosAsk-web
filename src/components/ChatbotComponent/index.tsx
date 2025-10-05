import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import chatTemplate from './chatTemplate';
import { useRef, useState } from 'react';

type ChatbotComponentProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

// const ChatbotContainer = styled.div`
//   margin: 0 auto;
//   background-color: ${theme.colors.backgroundTertiary};
// `;

const ChatbotSection = styled.div`
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChatbotInfoParagraph = styled.p`
  font-size: 3rem;
`;

const TagboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 60px 0 1rem;
`;

const Tagbox = styled.button`
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  border-radius: 1rem;
  border: none;
  padding: ${theme.spacing.xs} 10px;
  font-size: ${theme.fontSizes.base};
`;

const ChatInputContainer = styled.div`
  background-color: ${theme.colors.backgroundSecondary};
  display: flex;
  border-radius: ${theme.radii.md};
  border: 1px solid transparent;
  padding: ${theme.spacing.xs} ${theme.spacing.md};

  &:focus-visible {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.sm};
  }
`;

const ChatInput = styled.input`
  width: 750px;
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.lg};
  background-color: transparent;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  &::placeholder {
    color: #aaa6ad;
  }
`;

export default function ChatbotComponent({ onSubmit }: ChatbotComponentProps) {
  const [chatMsg, setChatMsg] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit?.(e);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ChatbotSection>
      <ChatbotInfoParagraph>어떤 공지사항이 궁금하신가요?</ChatbotInfoParagraph>
      <TagboxContainer>
        {/* <Tagbox>#수강신청</Tagbox>
        <Tagbox>#휴학/복학</Tagbox>
        <Tagbox>#장학금</Tagbox>
        <Tagbox>#비교과</Tagbox> */}
        {chatTemplate.map(({ tag, template }, idx) => (
          <Tagbox
            key={idx}
            onClick={() => {
              setChatMsg(template);
              inputRef.current?.focus();
            }}
          >
            {tag}
          </Tagbox>
        ))}
      </TagboxContainer>
      <form onSubmit={handleSubmit}>
        <ChatInputContainer>
          <ChatInput
            placeholder='메세지를 입력하세요...'
            value={chatMsg}
            onChange={(e) => setChatMsg(e.target.value)}
            ref={inputRef}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='45'
            height='44'
            viewBox='0 0 45 44'
            fill='none'
          >
            <rect x='0.5' width='44' height='44' rx='22' fill='#408CFF' />
            <path
              d='M22.9004 12.22L30.9004 20.1743M22.9004 12.22L14.9004 20.1743M22.9004 12.22V30.78'
              stroke='#98BFFA'
              strokeWidth='4.01465'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </ChatInputContainer>
      </form>
    </ChatbotSection>
  );
}
