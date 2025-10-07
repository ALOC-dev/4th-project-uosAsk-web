import departmentsData from './department.json' assert { type: 'json' };

// import된 JSON은 런타임 값이므로 'as const' 불가 -> 타입 검사용 'satisfies' 사용
export const DEPARTMENTS = departmentsData satisfies readonly string[];
export type Deparment = typeof DEPARTMENTS[number];