import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      backgroundButton: string;
      contentContainer: string;
      foreground: string;
      text: string;
      textSecondary: string;
      textTertiary: string;
      textQuaternary?: string;
      textFaded?: string;
      navTextActive: string;
      border: string;
      borderLight: string;
      error: string;
      success: string;
      warning: string;
      info: string;
      muted: string;
      mutedBackground: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    fonts: {
      sans: string;
      mono: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
