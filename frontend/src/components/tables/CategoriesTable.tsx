import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import CategoryModel from '../../models/Category.model';

interface CategoriesTableProps {
  categories: CategoryModel[];
  onEdit?: (item: CategoryModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function CategoriesTable({ categories, onEdit, onCreate, onDelete }: CategoriesTableProps) {
  return (
    <div className="flex size-full items-start">
      <table className=" w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr>
            <th>#</th>
            <th>Kategória Név</th>
            {onCreate && (
              <th className="flex justify-center">
                <button onClick={onCreate} className="btn-icon flex items-center justify-center">
                  <FiPlus />
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
            >
              <td>{index + 1}.</td>
              <td>{item.categoryName}</td>

              <td className="flex items-center justify-center space-x-2">
                {onEdit && (
                  <button onClick={() => onEdit(item)} className="btn-icon">
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

export default CategoriesTable;
