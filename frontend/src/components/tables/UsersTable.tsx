import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import UserModel from '../../models/User.model';

interface UsersTableProps {
  users: UserModel[];
  onEdit?: (item: UserModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function UsersTable({ users, onEdit, onDelete, onCreate }: UsersTableProps) {
  return (
    <div className="flex size-full items-start">
      <table className=" w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr className="h-20">
            <th>#</th>
            <th>Létrehozva</th>
            <th>Szerepkör</th>
            <th>Felhasználónév</th>
            <th>Email</th>
            <th>Mentett Hír</th>
            <th>Mentett Film</th>
            {onCreate && (
              <th>
                <button onClick={onCreate} className="btn-icon">
                  <FiPlus />
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
            >
              <td>{index + 1}.</td>
              <td>{format(new Date(item.createdAt), 'yyyy.MM.dd')}</td>
              <td>{item.role}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.userNews.length}</td>
              <td>{item.userMovies.length}</td>
              <td>
                {onEdit && (
                  <button onClick={() => onEdit(item)} className="btn-icon mx-1">
                    <FiEdit />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(item._id)} className="btn-icon mx-1">
                    <FiTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
