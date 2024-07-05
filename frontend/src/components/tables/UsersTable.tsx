import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import UserModel from '../../models/User.model';

interface NewsTableProps {
  users: UserModel[];
  onEdit?: (item: UserModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function NewsTable({ users, onEdit, onDelete, onCreate }: NewsTableProps) {
  return (
    <div className="overflow-x-auto my-10">
      <table className="min-w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr>
            <th>#</th>
            <th>Létrehozva</th>
            <th>Szerepkör</th>
            <th>Felhasználónév</th>
            <th>email</th>
            <th>Mentett Hír</th>
            <th>Mentett film</th>
            {onCreate && (
              <th className="flex justify-center">
                <button onClick={onCreate} className="btn-icon flex items-center  justify-center">
                  <FiPlus />
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={item._id} className="border-t border-border-light">
              <td>{index + 1}.</td>
              <td>{format(item.createdAt, 'yyyy.MM.dd')}</td>
              <td>{item.role}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.userNews.length}</td>
              <td>{item.userMovies.length}</td>

              <td className="flex items-center justify-center space-x-2 ">
                {onEdit && (
                  <button onClick={() => onEdit(item)} className="btn-icon">
                    <FiEdit />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(item._id)} className="btn-icon">
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

export default NewsTable;
