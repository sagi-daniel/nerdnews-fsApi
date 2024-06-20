import { UserModel } from '../User.model';

export interface UsersResponseModel {
  status: 'success' | 'error';
  results: number;
  totalItems: number;
  data: {
    users: UserModel[];
  };
}

export interface UserResponseModel {
  status: 'success' | 'error';
  data: {
    users: UserModel;
  };
}
