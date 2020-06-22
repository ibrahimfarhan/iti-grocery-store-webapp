import { UserRole } from './userRole';

export interface User {
  fullName: string;
  email: string;
  role?: UserRole;
  address?: string;
  phoneNumber?: number;
}
