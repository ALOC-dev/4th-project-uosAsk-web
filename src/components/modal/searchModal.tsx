'use client';

import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchInputContainer = styled.figure`
  display: flex;
  background-color: ${theme.colors.backgroundTertiary};
  color: ${theme.colors.textTertiary};
  position: fixed;
  top: 25%;
  left: 25%;
  z-index: 50;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.md};
  border-radius: ${theme.radii.md};
  gap: 0.25rem;
`;

const SearchInput = styled.input`
  width: 732px;
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.lg};
  background-color: transparent;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  &::placeholder {
    color: #aaa6ad;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function SearchModal() {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const el = document.getElementById('modal');
    setPortalElement(el);
  }, []);

  if (!portalElement) return null; // 아직 안 잡혔을 때는 렌더 X

  return createPortal(
    <>
      <Backdrop onClick={() => router.replace('/')} />
      <SearchInputContainer>
        <Image src='/images/Union.svg' alt='icon' width={24} height={24} />
        <SearchInput placeholder='공지사항 제목을 입력해주세요.' />
      </SearchInputContainer>
    </>,
    portalElement,
  );
}
