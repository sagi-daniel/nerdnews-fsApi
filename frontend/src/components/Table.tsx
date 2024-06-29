import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

export interface Column<T> {
  key: keyof T;
  label: string;
  formatter?: (value: any) => string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete: (id: string) => void;
  onCreate?: () => void;
}

function Table<T extends { _id: string }>({ data, columns, onEdit, onDelete, onCreate }: TableProps<T>) {
  return (
    <div className="overflow-x-auto my-10">
      <table className="min-w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
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
          {data?.map((item) => (
            <tr key={item._id} className="border-t border-border-light">
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.formatter ? column.formatter(item[column.key]) : String(item[column.key])}
                </td>
              ))}
              <td className="flex items-center justify-center space-x-2 ">
                {onEdit && (
                  <button onClick={() => onEdit(item)} className="btn-icon">
                    <FiEdit />
                  </button>
                )}

                <button onClick={() => onDelete(item._id)} className="btn-icon">
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
