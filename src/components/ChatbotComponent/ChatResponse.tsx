'use client';

import styled from '@emotion/styled';
import { ChatMessage, ChatResponse } from '@/types/chat';

const UserMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const UserMessageBubble = styled.div`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(64, 140, 255, 0.2);
`;

const BotResponseContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const ResponseText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SuggestionsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SuggestionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SuggestionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SuggestionTag = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.textTertiary};
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <UserMessageContainer>
      <UserMessageBubble>{message.content}</UserMessageBubble>
    </UserMessageContainer>
  );
}

interface BotResponseProps {
  response: ChatResponse;
  onSuggestionClick?: (suggestion: string) => void;
}

export function BotResponse({ response, onSuggestionClick }: BotResponseProps) {
  return (
    <BotResponseContainer>
      <ResponseText>{response.message}</ResponseText>

      {/* {response.imageUrl && (
        <ImagePlaceholder>이미지가 여기에 표시됩니다</ImagePlaceholder>
      )} */}

      {/* {response.suggestions && response.suggestions.length > 0 && (
        <SuggestionsContainer>
          <SuggestionTitle>추천 질문:</SuggestionTitle>
          <SuggestionsList>
            {response.suggestions.map((suggestion, index) => (
              <SuggestionTag
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
              >
                #{suggestion}
              </SuggestionTag>
            ))}
          </SuggestionsList>
        </SuggestionsContainer>
      )} */}
    </BotResponseContainer>
  );
}

export function LoadingBubble() {
  return (
    <BotResponseContainer>
      <LoadingDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </LoadingDots>
    </BotResponseContainer>
  );
}
