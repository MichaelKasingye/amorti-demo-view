
export interface Product {
  id: string;
  name: string;
  description: string;
  valuePercentage: number;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  valuePercentage: number;
}
