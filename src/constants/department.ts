import universitiesData from './university.json' assert { type: 'json' };

export interface University {
  university: string;
  departments: string[];
}

// UI용
export const UNIVERSITIES: University[] = universitiesData;

// API용
export type Department =
  (typeof universitiesData)[number]['departments'][number];
