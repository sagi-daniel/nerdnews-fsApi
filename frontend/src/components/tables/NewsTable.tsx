import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { CATEGORY_COLORS } from '../../utils/constants';
import { format } from 'date-fns';
import NewsModel from '../../models/News.model';
import Badge from '../Badge';

interface NewsTableProps {
  news: NewsModel[];
  onEdit?: (item: NewsModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function NewsTable({ news, onEdit, onDelete, onCreate }: NewsTableProps) {
  return (
    <table className="min-w-full bg-border-dark text-center text-content-dark rounded-md">
      <thead>
        <tr className="h-20">
          <th>#</th>
          <th>Publikálás</th>
          <th>Forrás</th>
          <th>Kategória</th>
          <th>Cím</th>
          <th>Link</th>
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
        {news?.map((item, index) => (
          <tr
            key={item._id}
            className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
          >
            <td>{index + 1}.</td>
            <td>{format(item.release, 'yyyy.MM.dd')}</td>
            <td>{item.source.sourceName}</td>
            <td>
              <Badge name={item.category.categoryName} colorOptions={CATEGORY_COLORS} />
            </td>
            <td>{item.title}</td>
            <td>
              <a href={item.link} target="_blank" rel="noreferrer" className="btn-primary">
                Megnyit
              </a>
            </td>

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
  );
}

export default NewsTable;
