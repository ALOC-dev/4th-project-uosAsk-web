export const CATEGORIES = ['GENERAL', 'ACADEMIC'] as const;

export type Category = (typeof CATEGORIES)[number];
