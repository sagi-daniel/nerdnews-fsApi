import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import NewsModel from '../../models/News.model';
import { format } from 'date-fns';

interface NewsTableProps {
  news: NewsModel[];
  onEdit?: (item: NewsModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function NewsTable({ news, onEdit, onDelete, onCreate }: NewsTableProps) {
  return (
    <div className="overflow-x-auto my-10">
      <table className="min-w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr>
            <th>#</th>
            <th>Publikálás</th>
            <th>Forrás</th>
            <th>Kategória</th>
            <th>Cím</th>
            <th>Link</th>
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
          {news?.map((item, index) => (
            <tr key={item._id} className="border-t border-border-light">
              <td>{index + 1}.</td>
              <td>{format(item.release, 'yyyy.MM.dd')}</td>
              <td>{item.source.sourceName}</td>
              <td>{item.category.categoryName}</td>
              <td>{item.title}</td>
              <td>
                <a href={item.link} target="_blank" rel="noreferrer" className="btn-primary">
                  Elolvasom
                </a>
              </td>

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
