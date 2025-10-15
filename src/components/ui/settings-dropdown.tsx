'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import universityData from '@/constants/university.json';

interface SettingsDropdownProps {
  open: boolean;
  onClose: () => void;
  onChange?: (payload: { departments: string[] }) => void;
}

const DROPDOWN_STORAGE_KEY = 'uosask-settings';

const Container = styled.div`
  position: absolute;
  top: 90px; /* below header */
  right: 40px;
  width: 800px; /* increased width for horizontal layout */
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

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const SelectAllContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const SelectAllButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

const SelectedCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const HorizontalLayout = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const UniversityColumn = styled.div`
  min-width: 200px;
  flex-shrink: 0;
`;

const UniversityTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  text-align: center;
`;

const DepartmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  max-height: 300px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export function SettingsDropdown({
  open,
  onClose,
  onChange,
}: SettingsDropdownProps) {
  const departmentGroups = useMemo(() => {
    return universityData.map((u) => ({
      university: u.university,
      departments: u.departments.sort(),
    }));
  }, []);

  const allDepartments = useMemo(() => {
    const departments: string[] = [];
    universityData.forEach((u) => {
      u.departments.forEach((dept) => {
        if (!departments.includes(dept)) {
          departments.push(dept);
        }
      });
    });
    return departments.sort();
  }, []);

  const [departments, setDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(DROPDOWN_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          departments?: string[];
        };
        if (parsed.departments && Array.isArray(parsed.departments)) {
          const validDepartments = parsed.departments.filter((dep) =>
            allDepartments.includes(dep),
          );
          setDepartments(validDepartments);
        } else {
          setDepartments([]);
        }
      }
    } catch {}
  }, [open, allDepartments]);

  if (!open) return null;

  const handleSave = () => {
    const payload = { departments };
    try {
      localStorage.setItem(DROPDOWN_STORAGE_KEY, JSON.stringify(payload));
    } catch {}
    onChange?.(payload);
    onClose();
  };

  const handleDepartmentToggle = (department: string) => {
    setDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department],
    );
  };

  const handleSelectAll = () => {
    if (departments.length === allDepartments.length) {
      setDepartments([]);
    } else {
      setDepartments([...allDepartments]);
    }
  };

  const filteredDepartmentGroups = !searchTerm.trim()
    ? departmentGroups
    : departmentGroups
        .map((group) => ({
          ...group,
          departments: group.departments.filter((dept) =>
            dept.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((group) => group.departments.length > 0);

  return (
    <Container role='dialog' aria-modal='true' aria-label='설정'>
      <Title>설정</Title>
      <Field>
        <Label htmlFor='department'>학과 선택</Label>
        <SearchInput
          type='text'
          placeholder='학과명으로 검색...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectAllContainer>
          <SelectAllButton onClick={handleSelectAll}>
            {departments.length === allDepartments.length
              ? '전체 해제'
              : '전체 선택'}
          </SelectAllButton>
          <SelectedCount>{departments.length}개 선택됨</SelectedCount>
        </SelectAllContainer>
        <HorizontalLayout>
          {filteredDepartmentGroups.map((group) => (
            <UniversityColumn key={group.university}>
              <UniversityTitle>{group.university}</UniversityTitle>
              <DepartmentList>
                {group.departments.map((department) => (
                  <CheckboxItem key={department}>
                    <Checkbox
                      type='checkbox'
                      checked={departments.includes(department)}
                      onChange={() => handleDepartmentToggle(department)}
                    />
                    {department}
                  </CheckboxItem>
                ))}
              </DepartmentList>
            </UniversityColumn>
          ))}
        </HorizontalLayout>
      </Field>
      <Actions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSave}>저장</Button>
      </Actions>
    </Container>
  );
}

export default SettingsDropdown;
