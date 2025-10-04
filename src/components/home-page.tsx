'use client';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes['4xl']};
  font-weight: bold;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.foreground};
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.theme.colors.muted};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Card = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.mutedBackground};
  border-radius: ${(props) => props.theme.radii.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Badge = styled.span<{ color: string }>`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.xs};
  background-color: ${(props) => props.color};
  color: white;
  border-radius: ${(props) => props.theme.radii.md};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
`;

export default function HomePage() {
  const theme = useTheme();

  return (
    <Container>
      <Title>uosAsk</Title>
      <Description>
        서울시립대 학생을 위한 학습 커뮤니티 - Emotion Theme으로 스타일링된
        페이지입니다
      </Description>

      <Card>
        <h2
          css={css`
            font-size: ${theme.fontSizes.xl};
            font-weight: 600;
            margin-bottom: ${theme.spacing.md};
            color: ${theme.colors.foreground};
          `}
        >
          ✨ 프로젝트 설정 완료
        </h2>
        <div>
          <Badge color={theme.colors.primary}>✅ Next.js 15 App Router</Badge>
          <Badge color={theme.colors.secondary}>✅ Emotion + Theme</Badge>
          <Badge color={theme.colors.warning}>✅ TypeScript</Badge>
          <Badge color={theme.colors.success}>✅ Turbopack</Badge>
        </div>
      </Card>

      <Card>
        <h3
          css={css`
            font-size: ${theme.fontSizes.lg};
            font-weight: 600;
            margin-bottom: ${theme.spacing.md};
            color: ${theme.colors.foreground};
          `}
        >
          🎨 Theme 사용 예제
        </h3>
        <div
          css={css`
            display: flex;
            gap: ${theme.spacing.md};
            flex-wrap: wrap;
          `}
        >
          <div
            css={css`
              padding: ${theme.spacing.md};
              background: ${theme.colors.primary};
              color: white;
              border-radius: ${theme.radii.md};
              box-shadow: ${theme.shadows.md};
            `}
          >
            Primary Color
          </div>
          <div
            css={css`
              padding: ${theme.spacing.md};
              background: ${theme.colors.secondary};
              color: white;
              border-radius: ${theme.radii.md};
              box-shadow: ${theme.shadows.md};
            `}
          >
            Secondary Color
          </div>
          <div
            css={css`
              padding: ${theme.spacing.md};
              background: ${theme.colors.success};
              color: white;
              border-radius: ${theme.radii.md};
              box-shadow: ${theme.shadows.md};
            `}
          >
            Success Color
          </div>
        </div>
      </Card>

      <div
        css={css`
          padding: ${theme.spacing.md};
          background-color: ${theme.colors.mutedBackground};
          border-left: 4px solid ${theme.colors.primary};
          border-radius: ${theme.radii.sm};
          font-size: ${theme.fontSizes.sm};
          color: ${theme.colors.muted};
        `}
      >
        <strong>💡 Tip:</strong> Theme을 사용하면 일관된 디자인 시스템을 쉽게
        구축할 수 있습니다!
      </div>
    </Container>
  );
}
