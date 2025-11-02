'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { departmentNoticeData } from '@/data/notices';
import { hasUserSettings } from '@/utils/user-settings';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl}`};
  gap: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  min-height: 400px;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  opacity: 0.8;

  img {
    filter: brightness(0.8) contrast(1.2) saturate(1.3);
  }
`;

const Message = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const MessageTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  letter-spacing: -0.02em;
`;

const MessageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 400;
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const SettingsHint = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  img {
    opacity: 0.6;
  }
`;

export default function DepartmentPage() {
  const [hasSettings, setHasSettings] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // 설정 상태 확인
    setHasSettings(hasUserSettings());

    // 설정 변경 감지를 위한 storage 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'uosask-settings') {
        setHasSettings(hasUserSettings());
        setRefreshKey((prev) => prev + 1); // 컨텐츠 새로고침
      }
    };

    // 같은 탭에서의 변경 감지를 위한 커스텀 이벤트 리스너
    const handleSettingsChange = () => {
      setHasSettings(hasUserSettings());
      setRefreshKey((prev) => prev + 1); // 컨텐츠 새로고침
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('settingsChanged', handleSettingsChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('settingsChanged', handleSettingsChange);
    };
  }, []);

  return (
    <NoticeLayout type='department'>
      {hasSettings ? (
        <AnimatedNoticeList
          key={refreshKey}
          noticeData={departmentNoticeData}
        />
      ) : (
        <EmptyStateContainer>
          <IconWrapper>
            <Image
              src='/images/setting-icon.svg'
              alt='설정'
              width={50}
              height={50}
            />
          </IconWrapper>
          <Message>
            <MessageTitle>학과 설정이 필요합니다</MessageTitle>
            <MessageDescription>
              학과별 맞춤 공지를 받아보시려면
              <br />
              단과대학과 학과를 설정해주세요
            </MessageDescription>
          </Message>
          <SettingsHint>
            <Image
              src='/images/setting-icon.svg'
              alt='설정'
              width={20}
              height={20}
            />
            <span>우측 상단의 설정 아이콘을 클릭하여 설정할 수 있습니다</span>
          </SettingsHint>
        </EmptyStateContainer>
      )}
    </NoticeLayout>
  );
}
