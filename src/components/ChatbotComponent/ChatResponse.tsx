'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ChatMessage, UIChatResponse } from '@/types/chat';

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

const UserMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

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

const NoticeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const NoticeCardTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const NoticeCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const NoticeTitle = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: opacity 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const NoticeMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const NoticeMetaItem = styled.span`
  &::after {
    content: '•';
    margin: 0 ${({ theme }) => theme.spacing.xs};
  }

  &:last-child::after {
    content: '';
    margin: 0;
  }
`;

const NoticeExcerpt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-top: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    -webkit-line-clamp: 2;
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
  response?: UIChatResponse;
  onSuggestionClick?: (suggestion: string) => void;
}

export function BotResponse({ response, onSuggestionClick }: BotResponseProps) {
  if (!response) {
    return null;
  }

  return (
    <BotResponseContainer>
      <ResponseText>{response.message}</ResponseText>

      {response.recommendedNotice && (
        <NoticeCard>
          <NoticeCardTitle>추천 공지사항</NoticeCardTitle>
          <NoticeCardContent>
            <NoticeTitle
              href={response.recommendedNotice.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {response.recommendedNotice.title}
            </NoticeTitle>
            <NoticeMeta>
              <NoticeMetaItem>
                {response.recommendedNotice.department}
              </NoticeMetaItem>
              <NoticeMetaItem>
                {response.recommendedNotice.category}
              </NoticeMetaItem>
              <NoticeMetaItem>
                {response.recommendedNotice.posted_date}
              </NoticeMetaItem>
              <NoticeMetaItem>
                관련도: {(response.recommendedNotice.score * 100).toFixed(0)}%
              </NoticeMetaItem>
            </NoticeMeta>
            <NoticeExcerpt>{response.recommendedNotice.content}</NoticeExcerpt>
          </NoticeCardContent>
        </NoticeCard>
      )}
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
