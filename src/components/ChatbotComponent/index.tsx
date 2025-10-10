import styled from '@emotion/styled';
import chatTemplate from './chatTemplate';
import { useRef, useState, useEffect } from 'react';
import { ChatMessage, ChatResponse } from '@/types/chat';
import {
  generateMockResponse,
  simulateApiDelay,
} from '@/services/chat/mockResponses';
import { UserMessage, BotResponse, LoadingBubble } from './ChatResponse';

type ChatbotComponentProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ChatbotSection = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const WelcomeSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TagboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 0 1rem;
`;

const Tagbox = styled.button`
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 1rem;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const ChatInputContainer = styled.div`
  background-color: #f0f1f5;
  display: flex;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const ChatInput = styled.input`
  width: 750px;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  background-color: transparent;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.05);
  }

  &:active svg {
    transform: scale(0.95);
  }
`;

const MarginDiv = styled.div`
  height: 60px;
  width: 100%;
`;

export default function ChatbotComponent({ onSubmit }: ChatbotComponentProps) {
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [responses, setResponses] = useState<Record<string, ChatResponse>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // 메시지 전송 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatMsg.trim() || isLoading) return;

    // 첫 메시지인 경우 채팅 시작
    if (!isChatStarted) {
      setIsChatStarted(true);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: chatMsg.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatMsg('');
    setIsLoading(true);

    // API 지연 시뮬레이션
    await simulateApiDelay(1500);

    // 봇 응답 생성
    const botResponse = generateMockResponse(userMessage.content);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: botResponse.message,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);

    // 응답 저장 (추천 질문용)
    setResponses((prev) => ({
      ...prev,
      [botMessage.id]: botResponse,
    }));

    setIsLoading(false);

    // 기존 onSubmit 콜백도 호출
    onSubmit?.(e);
  };

  // 추천 질문 클릭 처리
  const handleSuggestionClick = (suggestion: string) => {
    setChatMsg(suggestion);
    inputRef.current?.focus();
  };

  // 메시지가 추가될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <ChatbotSection>
      {!isChatStarted ? (
        <>
          <WelcomeContainer>
            <WelcomeTitle>어떤 공지사항이 궁금하신가요?</WelcomeTitle>
          </WelcomeContainer>
          <MarginDiv />
        </>
      ) : (
        <ChatContainer ref={chatContainerRef}>
          {messages.map((message) => (
            <div key={message.id}>
              {message.sender === 'user' ? (
                <UserMessage message={message} />
              ) : (
                <BotResponse
                  response={responses[message.id]}
                  onSuggestionClick={handleSuggestionClick}
                />
              )}
            </div>
          ))}
          {isLoading && <LoadingBubble />}
        </ChatContainer>
      )}

      <TagboxContainer>
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
            disabled={isLoading}
          />
          <SendButton
            type='submit'
            disabled={chatMsg.length === 0 || isLoading}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='45'
              height='44'
              viewBox='0 0 45 44'
              fill='none'
            >
              <rect
                x='0.5'
                width='44'
                height='44'
                rx='22'
                fill={chatMsg.length === 0 || isLoading ? '#ccc' : '#408CFF'}
              />
              <path
                d='M22.9004 12.22L30.9004 20.1743M22.9004 12.22L14.9004 20.1743M22.9004 12.22V30.78'
                stroke='#FFFFFF'
                strokeWidth='4.01465'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </SendButton>
        </ChatInputContainer>
      </form>
    </ChatbotSection>
  );
}
