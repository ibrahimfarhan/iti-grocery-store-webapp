import { UserRole } from './userRole';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: any;
  email: string;
  role?: UserRole;
  address?: string;
  phoneNumber?: number;
}
