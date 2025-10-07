'use client';

import styled from '@emotion/styled';
import { Notice } from '@/types/notice';

const NoticeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

const NoticeList = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const NoticeItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing['xl']}`};
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;
  min-height: 56px;
  max-height: 56px;
  overflow: hidden; /* 넘치는 콘텐츠 숨김 */

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoticeTitle = styled.h3<{ isImportant?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ isImportant }) => (isImportant ? 500 : 500)};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  margin: 0;
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임표 표시 */
`;

const NoticeInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0; /* flex 아이템이 축소될 수 있도록 */
`;

const NoticeDepartment = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임표 표시 */
  flex-shrink: 1; /* 필요시 축소 가능 */
`;

const NoticeDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap; /* 줄바꿈 방지 */
  flex-shrink: 0; /* 날짜는 축소되지 않도록 */
`;

interface NoticeLayoutProps {
  notices: Notice[];
  onNoticeClick?: (notice: Notice) => void;
}

export function NoticeLayout({ notices, onNoticeClick }: NoticeLayoutProps) {
  const handleNoticeClick = (notice: Notice) => {
    if (onNoticeClick) {
      onNoticeClick(notice);
    }
  };

  return (
    <NoticeContainer>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.id} onClick={() => handleNoticeClick(notice)}>
            <NoticeTitle isImportant={notice.isImportant}>
              {notice.title}
            </NoticeTitle>
            <NoticeInfo>
              <NoticeDepartment>{notice.department}</NoticeDepartment>
              <NoticeDate>{notice.date}</NoticeDate>
            </NoticeInfo>
          </NoticeItem>
        ))}
      </NoticeList>
    </NoticeContainer>
  );
}
