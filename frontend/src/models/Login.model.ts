import { UserModel } from './User.model';

export interface LoginResponse {
  token: string;
  data: {
    user: UserModel;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}
