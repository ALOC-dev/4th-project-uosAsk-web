'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Spotlight 스타일 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  z-index: 9998;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 80%;
  max-width: 840px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  img {
    filter: brightness(0.8) contrast(1.2) saturate(1.3);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: transparent;
  letter-spacing: -0.02em;
  margin: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes['xl']};
    width: 100%;
  }
`;

interface SearchModalProps {
  keyword?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({
  keyword,
  isOpen,
  onClose,
}: SearchModalProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const el = document.getElementById('modal');
    setPortalElement(el);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && searchQuery.trim()) {
        // Enter 키로 검색 실행
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, searchQuery, router]);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery(keyword || '');
    }
  }, [isOpen]);

  if (!isOpen || !portalElement) return null;

  return createPortal(
    <>
      <Backdrop onClick={onClose} />
      <ModalContainer>
        <SearchInputWrapper>
          <SearchIconWrapper>
            <Image
              src='/images/search-icon.svg'
              alt='검색'
              width={40}
              height={40}
            />
          </SearchIconWrapper>
          <SearchInput
            type='text'
            placeholder='공지사항 제목을 입력해주세요'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </SearchInputWrapper>
      </ModalContainer>
    </>,
    portalElement,
  );
}
