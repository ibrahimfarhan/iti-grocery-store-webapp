import { UserRole } from './user-role';

export interface User {
  id: string;
  token?: string;
  fullName: string;
  email: string;
  roles?: UserRole[];
  address?: string;
  phoneNumber?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  imgUrl?: string;
}
