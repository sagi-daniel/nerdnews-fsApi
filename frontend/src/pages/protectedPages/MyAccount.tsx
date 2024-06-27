import { useState } from 'react';
import { UserModel } from '../../models/User.model';
import { useUser } from '../../features/auth/useUser';
import Section from '../../components/Section';

function MyAccount() {
  const { user } = useUser();

  const [editedUser, setEditedUser] = useState<Partial<UserModel>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // updateUser(editedUser);
  };

  return (
    <Section type="horizontal" space="large" gap="small">
      {' '}
      <div className="size-full max-w-md mx-auto mt-8 p-6 bg-border-dark shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">My Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="userName"
              value={editedUser.userName || user?.userName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email || user?.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div className="mt-6 text-sm text-gray-600">
          <p>Account created: {user && new Date(user.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {user && new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Section>
  );
}

export default MyAccount;
