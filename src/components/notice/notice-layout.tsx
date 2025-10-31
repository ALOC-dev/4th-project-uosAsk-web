'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { NoticeType } from '@/types/notice';
import { NoticeHeader } from './notice-header';

const NoticeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NoticeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const NoticeFooter = styled.div`
  height: 18px; /* notice-header와 동일한 높이 (padding 포함) */
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  flex-shrink: 0;
`;

interface NoticeLayoutProps {
  type: NoticeType;
  icon?: string;
  title?: string;
  children: ReactNode;
}

export function NoticeLayout({
  type,
  icon,
  title,
  children,
}: NoticeLayoutProps) {
  return (
    <NoticeContainer>
      <NoticeHeader type={type} icon={icon} title={title} />
      <NoticeContent>{children}</NoticeContent>
      <NoticeFooter />
    </NoticeContainer>
  );
}
