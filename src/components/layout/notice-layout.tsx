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

const NoticeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const NoticeFooter = styled.div`
  height: 72px; /* notice-header와 동일한 높이 (padding 포함) */
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  flex-shrink: 0;
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
      <NoticeContent>
        <AnimatedNoticeList notices={notices} onNoticeClick={onNoticeClick} />
      </NoticeContent>
      <NoticeFooter />
    </NoticeContainer>
  );
}
