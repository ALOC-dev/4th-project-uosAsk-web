'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ChatMessage, ChatResponse } from '@/types/chat';

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const UserMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  animation: ${slideInRight} 0.3s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const UserMessageBubble = styled.div`
  max-width: calc(100% - ${({ theme }) => theme.spacing.md} * 2);
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(64, 140, 255, 0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: calc(100% - ${({ theme }) => theme.spacing.sm} * 2);
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(100% - ${({ theme }) => theme.spacing.xs} * 2);
  }
`;

const BotResponseContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  animation: ${fadeInUp} 0.4s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ResponseText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.5;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 150px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => theme.spacing.xs};
  }

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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    gap: 3px;
  }
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.textTertiary};
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 6px;
    height: 6px;
  }

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
