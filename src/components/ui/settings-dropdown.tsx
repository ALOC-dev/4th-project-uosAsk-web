'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import universityData from '@/constants/university.json';

interface SettingsDropdownProps {
  open: boolean;
  onClose: () => void;
  onChange?: (payload: { university: string; department: string }) => void;
}

const DROPDOWN_STORAGE_KEY = 'uosask-settings';

const Container = styled.div`
  position: absolute;
  top: 90px; /* below header */
  right: 40px;
  width: 360px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  z-index: 50;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Select = styled.select`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled.button`
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

export function SettingsDropdown({
  open,
  onClose,
  onChange,
}: SettingsDropdownProps) {
  const universities = useMemo(
    () => universityData.map((u) => u.university),
    [],
  );
  const departmentMap = useMemo(() => {
    const map = new Map<string, string[]>();
    universityData.forEach((u) => map.set(u.university, u.departments));
    return map;
  }, []);

  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(DROPDOWN_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          university?: string;
          department?: string;
        };
        if (parsed.university && universities.includes(parsed.university)) {
          setUniversity(parsed.university);
          const deps = departmentMap.get(parsed.university) ?? [];
          if (parsed.department && deps.includes(parsed.department)) {
            setDepartment(parsed.department);
          } else {
            setDepartment('');
          }
        }
      }
    } catch {}
  }, [open, universities, departmentMap]);

  useEffect(() => {
    if (!university) return;
    const deps = departmentMap.get(university) ?? [];
    if (!deps.includes(department)) {
      setDepartment('');
    }
  }, [university, department, departmentMap]);

  if (!open) return null;

  const handleSave = () => {
    const payload = { university, department };
    try {
      localStorage.setItem(DROPDOWN_STORAGE_KEY, JSON.stringify(payload));
    } catch {}
    onChange?.(payload);
    onClose();
  };

  const availableDepartments = departmentMap.get(university) ?? [];

  return (
    <Container role='dialog' aria-modal='true' aria-label='설정'>
      <Title>설정</Title>
      <Field>
        <Label htmlFor='university'>단과대학</Label>
        <Select
          id='university'
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          <option value=''>선택하세요</option>
          {universities.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label htmlFor='department'>학과</Label>
        <Select
          id='department'
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={!university}
        >
          <option value=''>선택하세요</option>
          {availableDepartments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </Field>
      <Actions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSave}>저장</Button>
      </Actions>
    </Container>
  );
}

export default SettingsDropdown;
