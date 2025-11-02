const SETTINGS_STORAGE_KEY = 'uosask-settings';

export interface UserSettings {
  university: string;
  department: string;
}

/**
 * 사용자 설정 정보를 localStorage에서 불러옵니다.
 */
export function getUserSettings(): UserSettings | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as UserSettings;
    if (parsed.university && parsed.department) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 사용자 설정 정보를 localStorage에 저장합니다.
 */
export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save user settings:', error);
  }
}

/**
 * 사용자 설정 정보를 localStorage에서 삭제합니다.
 */
export function clearUserSettings(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user settings:', error);
  }
}

/**
 * 사용자가 설정을 완료했는지 확인합니다.
 */
export function hasUserSettings(): boolean {
  return getUserSettings() !== null;
}
