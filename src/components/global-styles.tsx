'use client';

import { Global, css, useTheme } from '@emotion/react';

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.foreground};
          font-family: ${theme.fonts.sans};
        }

        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      `}
    />
  );
}
