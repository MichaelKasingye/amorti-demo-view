
export interface Department {
  id: string;
  name: string;
  description: string;
  departmentCode: string;
  isBranch: boolean;
  createdAt: string;
}

export interface DepartmentFormData {
  name: string;
  description: string;
  departmentCode: string;
  isBranch: boolean;
}
