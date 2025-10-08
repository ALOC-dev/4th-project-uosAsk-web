'use client';

import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';

const SearchInputContainer = styled.figure`
  display: flex;
  background-color: ${theme.colors.backgroundTertiary};
  color: ${theme.colors.textTertiary};
  position: fixed;
  top: 25%;
  left: 25%;
  /* z-index: 50; */
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

export default function SearchModal() {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // ✅ 클라이언트에서만 document 접근
  useEffect(() => {
    const el = document.getElementById('modal');
    setPortalElement(el);
  }, []);

  if (!portalElement) return null; // 아직 안 잡혔을 때는 렌더 X

  return createPortal(
    <>
      <SearchInputContainer>
        <Image src='/images/Union.svg' alt='icon' width={24} height={24} />
        <SearchInput placeholder='공지사항 제목을 입력해주세요.' />
      </SearchInputContainer>
    </>,
    portalElement,
  );
}
