
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  bio?: string;
  avatar?: string;
  receiveEmails?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;  
  bio?: string;
  receiveEmails?: boolean;
}
