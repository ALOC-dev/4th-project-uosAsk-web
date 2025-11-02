'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Notice } from '@/types/notice';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HotNoticeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  padding-left: 60px; /* HOT 뱃지 공간 확보 */
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 64.5px;
  max-height: 64.5px;
  overflow: hidden;
  position: relative;
  margin: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  animation: ${fadeInUp} 0.3s ease-out forwards;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const HotBadge = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  background: ${({ theme }) => theme.colors.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  z-index: 1;
`;

const NoticeTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.2;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`;

const NoticeDepartment = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
`;

const NoticeDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap;
  flex-shrink: 0;
`;

const NoticeClickCount = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0.7;
`;

interface HotNoticeItemProps {
  notice: Notice;
}

export const HotNoticeItem = ({ notice }: HotNoticeItemProps) => {
  const handleClick = () => {
    if (notice.link) {
      window.open(notice.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <HotNoticeCard onClick={handleClick}>
      <HotBadge>HOT!</HotBadge>
      <NoticeTitle>{notice.title}</NoticeTitle>
      <NoticeInfo>
        <NoticeDepartment>{notice.department}</NoticeDepartment>
        <NoticeDate>{notice.postedDate}</NoticeDate>
        <NoticeClickCount>{notice.viewCount} 조회</NoticeClickCount>
      </NoticeInfo>
    </HotNoticeCard>
  );
};
