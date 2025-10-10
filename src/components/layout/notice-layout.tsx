'use client';

import styled from '@emotion/styled';
import { Notice, NoticeType } from '@/types/notice';
import { NoticeHeader } from './notice-header';
import { AnimatedNoticeList } from './animated-notice-list';

const NoticeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

interface NoticeLayoutProps {
  notices: Notice[];
  type: NoticeType;
  onNoticeClick?: (notice: Notice) => void;
}

export function NoticeLayout({
  notices,
  type,
  onNoticeClick,
}: NoticeLayoutProps) {
  return (
    <NoticeContainer>
      <NoticeHeader type={type} count={notices.length} />
      <AnimatedNoticeList notices={notices} onNoticeClick={onNoticeClick} />
    </NoticeContainer>
  );
}
