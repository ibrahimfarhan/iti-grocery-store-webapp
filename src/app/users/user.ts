export interface LoginUSer {
  userName: string;
  password: string;
}
export interface User {
  firstName: string;
  lastName: string;
  password: any;
  email: string;
  address?: string;
  phoneNumber?: number;
}

export interface retrievedUser {
  id: number;
  userName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}
