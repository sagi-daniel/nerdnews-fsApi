import React, { useState } from 'react';
import UserAvatar from '../../components/parts/header/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import { UserModel } from '../../models/User.model';

const mockUser: UserModel = {
  _id: '1234567890',
  role: 'User',
  userName: 'John Doe',
  email: 'john.doe@example.com',
  userNews: [],
  userMovies: [],
  createdAt: '2021-01-01T00:00:00Z',
  updatedAt: '2022-01-01T00:00:00Z',
  // Add more user details as needed
};

const MyAccount = () => {
  const { user } = useAuth();

  const [isActive, setIsActive] = useState(false);

  const handleAvatarClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <div className="flex items-center space-x-4 mb-6">
        {user && <UserAvatar user={user} isActive={isActive} onClick={handleAvatarClick} size="large" />}
        <div>
          <h2 className="text-2xl font-semibold">{user ? user.userName : mockUser.userName}</h2>
          <p className="text-gray-600">{user ? user.email : mockUser.email}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Account Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Username:</span>
            <span>{user ? user.userName : mockUser.userName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Email:</span>
            <span>{user ? user.email : mockUser.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Role:</span>
            <span>{user ? user.role : mockUser.role}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Account Created:</span>
            <span>
              {user ? new Date(user.createdAt).toLocaleDateString() : new Date(mockUser.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Last Updated:</span>
            <span>
              {user ? new Date(user.updatedAt).toLocaleDateString() : new Date(mockUser.updatedAt).toLocaleDateString()}
            </span>
          </div>
          {/* Add more account details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
