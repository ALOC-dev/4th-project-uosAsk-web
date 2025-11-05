import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import chatTemplate from './chatTemplate';
import { useRef, useState, useEffect } from 'react';
import { ChatMessage, UIChatResponse } from '@/types/chat';
import { requestChatStream } from '@/services/chat/requestChat';
import { ConversationMessage } from '@/services/chat/chat.types';
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

type ChatbotComponentProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ChatbotSection = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.md}`};
  position: relative;
  overflow-x: hidden;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  }
`;

const ChatContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  /* 레이아웃 시프트 방지 */
  min-height: 0;
  contain: layout style;
  /* 스크롤바 공간 항상 예약하여 레이아웃 시프트 방지 */
  scrollbar-gutter: stable;
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

  /* 스크롤바 스타일링 - Webkit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.textTertiary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ChatContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing['2xl']} 0;
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
  max-width: 1000px;

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
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 1000px;
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
  color: ${({ theme }) => theme.colors.text};
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
  max-width: 1000px;
  display: flex;
  justify-content: center;
`;

const DisclaimerText = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: 0;
  padding: 0 ${({ theme }) => theme.spacing.md};
  max-width: 1000px;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.7rem;
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const MessageWrapper = styled.div<{ delay: number }>`
  animation: ${fadeInUp} 0.4s ease-out ${({ delay }) => delay}s both;
`;

// 상수
const MAX_CONVERSATION_HISTORY = 20;
const ERROR_MESSAGE = '오류가 발생했습니다, 다시 시도해주세요';

// 에러 컴포넌트 스타일
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: ${({ theme }) => theme.spacing.md};
  /* padding: ${({ theme }) => theme.spacing.lg}; */
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border: 1px solid ${({ theme }) => theme.colors.border}; */
  border-radius: ${({ theme }) => theme.radii.md};
  animation: ${fadeInUp} 0.4s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  /* text-align: center; */
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const RetryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  width: fit-content;
  /* margin: 0 auto; */
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface ErrorMessageProps {
  onRetry: () => void;
  isLoading: boolean;
}

function ErrorMessageComponent({ onRetry, isLoading }: ErrorMessageProps) {
  return (
    <ErrorContainer>
      <ErrorMessage>{ERROR_MESSAGE}</ErrorMessage>
      <RetryButton onClick={onRetry} disabled={isLoading}>
        {isLoading ? '재시도 중...' : '다시 시도'}
      </RetryButton>
    </ErrorContainer>
  );
}

export default function ChatbotComponent({ onSubmit }: ChatbotComponentProps) {
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [responses, setResponses] = useState<Record<string, UIChatResponse>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    lastQuery?: string;
  }>({ hasError: false });
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
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
   * API 호출 및 응답 처리 (스트리밍 방식)
   */
  const handleApiRequest = async (query: string) => {
    setErrorState({ hasError: false });

    const conversationHistory = buildConversationHistory(true).slice(
      -MAX_CONVERSATION_HISTORY,
    );

    // 스트리밍 메시지 ID (첫 토큰이 도착할 때 생성됨)
    const tempMessageId = (Date.now() + 1).toString();
    let accumulatedText = '';
    let isFirstToken = true;

    try {
      await requestChatStream(
        {
          query,
          conversation_history: conversationHistory,
        },
        // onToken: 토큰이 올 때마다 호출
        (token: string) => {
          accumulatedText += token;

          // 첫 토큰이 도착했을 때 메시지 생성
          if (isFirstToken) {
            isFirstToken = false;
            const tempMessage: ChatMessage = {
              id: tempMessageId,
              content: '',
              sender: 'bot',
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, tempMessage]);
            setResponses((prev) => ({
              ...prev,
              [tempMessageId]: { message: '', recommendedNotice: null },
            }));
            setStreamingMessageId(tempMessageId);
          }

          // 응답 업데이트
          setResponses((prev) => ({
            ...prev,
            [tempMessageId]: {
              ...prev[tempMessageId],
              message: accumulatedText,
            },
          }));
        },
        // onStatus: 상태 업데이트
        (status: string) => {
          // 상태 업데이트
        },
        // onDone: 완료 시 호출
        (turn: number, notice: any) => {
          setStreamingMessageId(null);

          // 공지사항 정보 추가
          if (notice) {
            setResponses((prev) => ({
              ...prev,
              [tempMessageId]: {
                ...prev[tempMessageId],
                recommendedNotice: notice,
              },
            }));
          }

          // 최종 메시지 업데이트
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempMessageId
                ? { ...msg, content: accumulatedText }
                : msg,
            ),
          );
        },
        // onError: 에러 발생 시 호출
        (error: string) => {
          console.error('❌ [채팅] 에러:', error);
          setStreamingMessageId(null);
          setErrorState({ hasError: true, lastQuery: query });

          // 임시 메시지 제거 (생성되었을 경우에만)
          if (!isFirstToken) {
            setMessages((prev) =>
              prev.filter((msg) => msg.id !== tempMessageId),
            );
            setResponses((prev) => {
              const newResponses = { ...prev };
              delete newResponses[tempMessageId];
              return newResponses;
            });
          }
        },
      );
    } catch (error) {
      console.error('❌ [채팅] 요청 실패:', error);
      setStreamingMessageId(null);
      setErrorState({ hasError: true, lastQuery: query });

      // 임시 메시지 제거 (생성되었을 경우에만)
      if (!isFirstToken) {
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
        setResponses((prev) => {
          const newResponses = { ...prev };
          delete newResponses[tempMessageId];
          return newResponses;
        });
      }
    }
  };

  /**
   * 에러 발생 시 재시도 처리
   */
  const handleRetry = async () => {
    if (!errorState.lastQuery) {
      return;
    }

    setIsLoading(true);
    try {
      await handleApiRequest(errorState.lastQuery);
    } catch (error) {
      // 재시도 실패는 이미 errorState에 저장됨
    } finally {
      setIsLoading(false);
    }
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
      setErrorState({ hasError: true, lastQuery: currentQuery });
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
  }, [messages, isLoading, responses]);

  /**
   * 새 채팅 시작 이벤트 리스너
   * 페이지 새로고침 없이 채팅 상태만 초기화
   */
  useEffect(() => {
    const handleResetChat = () => {
      setChatMsg('');
      setMessages([]);
      setResponses({});
      setIsLoading(false);
      setIsChatStarted(false);
      setErrorState({ hasError: false });
      setStreamingMessageId(null);
    };

    window.addEventListener('resetChat', handleResetChat);
    return () => window.removeEventListener('resetChat', handleResetChat);
  }, []);

  return (
    <ChatbotSection>
      {!isChatStarted ? (
        <>
          <WelcomeContainer>
            <WelcomeTitle>어떤 공지사항이 궁금하신가요?</WelcomeTitle>
          </WelcomeContainer>
          <MarginDiv />
          <TagboxContainer>
            {chatTemplate.map(({ tag, template }, idx) => (
              <Tagbox key={idx} onClick={() => handleTagClick(template)}>
                {tag}
              </Tagbox>
            ))}
          </TagboxContainer>
        </>
      ) : (
        <ChatContainer ref={chatContainerRef}>
          <ChatContentWrapper>
            {messages.map((message, index) =>
              message.sender === 'user' ? (
                <UserMessage key={message.id} message={message} />
              ) : (
                <MessageWrapper key={message.id} delay={index * 0.1}>
                  <BotResponse
                    response={responses[message.id]}
                    isStreaming={streamingMessageId === message.id}
                  />
                </MessageWrapper>
              ),
            )}
            {errorState.hasError && (
              <ErrorMessageComponent
                onRetry={handleRetry}
                isLoading={isLoading}
              />
            )}
            {isLoading && !streamingMessageId && !errorState.hasError && (
              <LoadingBubble />
            )}
          </ChatContentWrapper>
        </ChatContainer>
      )}

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
      <DisclaimerText>
        시누공은 실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
      </DisclaimerText>
    </ChatbotSection>
  );
}
