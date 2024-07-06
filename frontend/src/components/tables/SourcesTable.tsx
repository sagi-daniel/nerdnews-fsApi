import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import SourceModel from '../../models/Source.model';

interface SourceTableProps {
  sources: SourceModel[];
  onEdit?: (item: SourceModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function SourceTable({ sources, onEdit, onDelete, onCreate }: SourceTableProps) {
  return (
    <div className="flex size-full items-start">
      <table className=" w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr>
            <th>#</th>
            <th>Létrehozva</th>
            <th>Frissítve</th>
            <th>Forrás Név</th>
            <th>Forrás Típus</th>
            <th>Link</th>
            <th>Kategória</th>
            <th>Komment</th>
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
          {sources?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
            >
              <td>{index + 1}.</td>
              <td>{format(new Date(item.createdAt), 'yyyy.MM.dd')}</td>
              <td>{format(new Date(item.updatedAt), 'yyyy.MM.dd')}</td>
              <td>{item.sourceName}</td>
              <td>{item.sourceType}</td>
              <td>
                <a href={item.sourceLink} target="_blank" rel="noreferrer" className="btn-primary">
                  Megnyit
                </a>
              </td>
              <td>{item.category.categoryName}</td>
              <td>{item.comment || 'N/A'}</td>
              <td className="flex items-center justify-center space-x-2">
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

export default SourceTable;
