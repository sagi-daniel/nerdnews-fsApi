import UserModel from './User.model';

export interface LoginResponseModel {
  token: string;
  data: {
    user: UserModel;
  };
}

export interface ForgotPasswordResponseModel {
  status: string;
  message: string;
}

export interface LoginCredentialModel {
  email: string;
  password: string;
}

export interface SingupModel {
  role?: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface PasswordsModel {
  passwordCurrent?: string;
  password: string;
  passwordConfirm: string;
}
