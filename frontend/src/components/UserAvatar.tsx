import { UserModel } from '../models/User.model';

interface userAvatarProps {
  user: UserModel;
  isActive?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

function UserAvatar({ user, onClick, isActive = false, size = 'medium' }: userAvatarProps) {
  const userIconWords = user?.userName.substring(0, 2).toUpperCase();

  const sizeClasses = {
    small: 'text-sm p-1',
    medium: 'text-lg p-3',
    large: 'text-2xl p-5',
  };

  return (
    <span
      onClick={onClick}
      className={`${isActive ? 'bg-bg-dark dark:bg-primary-dark' : 'dark:bg-primary bg-content-light'} ${
        sizeClasses[size]
      } text-content-dark hover:bg-content-light dark:text-primary-content hover:dark:bg-primary-dark cursor-pointer font-semibold rounded-full`}
    >
      {userIconWords}
    </span>
  );
}

export default UserAvatar;
