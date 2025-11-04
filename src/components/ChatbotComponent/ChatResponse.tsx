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
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  &:first-of-type {
    margin-top: 0;
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
  animation: ${fadeInUp} 0.4s ease-out;
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
  isStreaming?: boolean;
}

const TypingCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: 2px;
  animation: blink 1s infinite;
  vertical-align: text-bottom;

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;

export function BotResponse({
  response,
  isStreaming = false,
}: BotResponseProps) {
  if (!response) {
    return null;
  }

  return (
    <BotResponseContainer>
      <ResponseText>
        {response.message}
        {isStreaming && <TypingCursor />}
      </ResponseText>

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
