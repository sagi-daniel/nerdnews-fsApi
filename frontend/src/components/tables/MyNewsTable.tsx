import { format } from 'date-fns';
import { FiTrash } from 'react-icons/fi';

import NewsModel from '../../models/News.model';

interface MyNewsTableProps {
  news: NewsModel[];
  onDelete?: (id: string) => void;
}

function MyNewsTable({ news, onDelete }: MyNewsTableProps) {
  return (
    <div className="flex size-full items-start">
      <table className=" w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr className="h-20">
            <th>Publikálás</th>

            <th>Cím</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {news?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
            >
              <td>{format(item.release, 'yyyy.MM.dd')}</td>

              <td>{item.title}</td>
              <td>
                <a href={item.link} target="_blank" rel="noreferrer" className="btn-primary">
                  Megnyit
                </a>
              </td>
              <td>
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

export default MyNewsTable;
