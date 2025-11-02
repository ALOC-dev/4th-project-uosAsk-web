import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import chatTemplate from './chatTemplate';
import { useRef, useState, useEffect } from 'react';
import { ChatMessage, UIChatResponse } from '@/types/chat';
import { requestChat } from '@/services/chat/requestChat';
import { ConversationMessage, ChatResponse } from '@/services/chat/chat.types';
import { UserMessage, BotResponse, LoadingBubble } from './ChatResponse';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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
  position: relative;
  overflow-x: hidden;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  /* 레이아웃 시프트 방지 */
  min-height: 0;
  contain: layout style;
  /* 스크롤바 공간 항상 예약하여 레이아웃 시프트 방지 */
  scrollbar-gutter: stable;

  /* 스크롤바 스타일링 - 트랙은 투명, thumb만 표시 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.textTertiary};
  }

  /* Firefox 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md} 0;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const WelcomeTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: ${slideUp} 0.8s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const TagboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 0 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 800px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 8px;
    margin: 0 0 ${({ theme }) => theme.spacing.md};
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const Tagbox = styled.button`
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 1rem;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all 0.2s ease;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs} 8px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ChatInputContainer = styled.div`
  background-color: #f0f1f5;
  display: flex;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 800px;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transform: translateY(-1px);
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const ChatInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  background-color: transparent;
  flex: 1;
  min-width: 0;
  transition: all 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
    transition: opacity 0.2s ease;
  }
  &:focus::placeholder {
    opacity: 0.5;
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
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    svg {
      width: 36px;
      height: 36px;
    }
  }

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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 40px;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
`;

const MessageWrapper = styled.div<{ delay: number }>`
  animation: ${fadeInUp} 0.4s ease-out ${({ delay }) => delay}s both;
`;

// 상수
const MAX_CONVERSATION_HISTORY = 20;
const ERROR_MESSAGE = '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.';

export default function ChatbotComponent({ onSubmit }: ChatbotComponentProps) {
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [responses, setResponses] = useState<Record<string, UIChatResponse>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * 대화 기록을 ConversationMessage 형태로 변환
   * @param excludeLastMessage 마지막 메시지를 제외할지 여부 (현재 사용자 메시지는 이미 query로 전송되므로)
   */
  const buildConversationHistory = (
    excludeLastMessage = false,
  ): ConversationMessage[] => {
    let messageList = messages.filter(
      (msg) => msg.sender === 'user' || msg.sender === 'bot',
    );

    if (excludeLastMessage && messageList.length > 0) {
      messageList = messageList.slice(0, -1);
    }

    return messageList.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content,
      timestamp: msg.timestamp.toISOString(),
    }));
  };

  /**
   * 채팅 컨테이너를 맨 아래로 스크롤
   * requestAnimationFrame을 사용하여 DOM 업데이트 후 스크롤
   */
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
  };

  /**
   * 사용자 메시지를 생성하고 추가
   */
  const createUserMessage = (content: string): ChatMessage => {
    return {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
  };

  /**
   * API 응답을 ChatMessage로 변환
   */
  const createAssistantMessage = (content: string): ChatMessage => {
    return {
      id: (Date.now() + 1).toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  /**
   * API 응답을 UI 형태로 변환
   */
  const convertApiResponseToUI = (
    apiResponse: ChatResponse,
  ): UIChatResponse => {
    const responseMessage = apiResponse.assistant || apiResponse.response || '';

    return {
      message: responseMessage,
      recommendedNotice: apiResponse.recommended_notice
        ? { ...apiResponse.recommended_notice }
        : null,
    };
  };

  /**
   * 에러 메시지 생성
   */
  const createErrorMessage = (): ChatMessage => {
    return createAssistantMessage(ERROR_MESSAGE);
  };

  /**
   * API 호출 및 응답 처리
   */
  const handleApiRequest = async (query: string) => {
    const conversationHistory = buildConversationHistory(true).slice(
      -MAX_CONVERSATION_HISTORY,
    );

    const apiResponse = await requestChat({
      query,
      conversation_history: conversationHistory,
    });

    if (!apiResponse) {
      setMessages((prev) => [...prev, createErrorMessage()]);
      return;
    }

    const uiResponse = convertApiResponseToUI(apiResponse);
    const assistantMessage = createAssistantMessage(uiResponse.message);

    setMessages((prev) => [...prev, assistantMessage]);
    setResponses((prev) => ({
      ...prev,
      [assistantMessage.id]: uiResponse,
    }));
  };

  /**
   * 메시지 전송 처리
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!chatMsg.trim() || isLoading) {
      return;
    }

    if (!isChatStarted) {
      setIsChatStarted(true);
    }

    const userMessage = createUserMessage(chatMsg);
    const currentQuery = chatMsg.trim();

    setMessages((prev) => [...prev, userMessage]);
    setChatMsg('');
    setIsLoading(true);

    try {
      await handleApiRequest(currentQuery);
    } catch (error) {
      setMessages((prev) => [...prev, createErrorMessage()]);
    } finally {
      setIsLoading(false);
    }

    onSubmit?.(e);
  };

  /**
   * Enter 키 입력 처리
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  /**
   * 추천 질문 클릭 처리
   */
  const handleTagClick = (template: string) => {
    setChatMsg(template);
    inputRef.current?.focus();
  };

  /**
   * 메시지 변경 시 스크롤
   * 두 번의 requestAnimationFrame을 사용하여 레이아웃이 완전히 계산된 후 스크롤
   */
  useEffect(() => {
    // 레이아웃 계산이 완료된 후 스크롤
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    });
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
          {messages.map((message, index) =>
            message.sender === 'user' ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <MessageWrapper key={message.id} delay={index * 0.1}>
                <BotResponse response={responses[message.id]} />
              </MessageWrapper>
            ),
          )}
          {isLoading && <LoadingBubble />}
        </ChatContainer>
      )}

      <TagboxContainer>
        {chatTemplate.map(({ tag, template }, idx) => (
          <Tagbox key={idx} onClick={() => handleTagClick(template)}>
            {tag}
          </Tagbox>
        ))}
      </TagboxContainer>
      <StyledForm onSubmit={handleSubmit}>
        <ChatInputContainer>
          <ChatInput
            placeholder='메세지를 입력하세요...'
            value={chatMsg}
            onChange={(e) => setChatMsg(e.target.value)}
            onKeyDown={handleKeyDown}
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
      </StyledForm>
    </ChatbotSection>
  );
}
