import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import MovieModel from '../../models/Movie.model';
import { capitalizeWord } from '../../utils/helpers';

interface MoviesTableProps {
  movies: MovieModel[];
  onEdit?: (item: MovieModel) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}

function MoviesTable({ movies, onEdit, onDelete, onCreate }: MoviesTableProps) {
  return (
    <div className="flex size-full items-start">
      <table className=" w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr className="h-20">
            <th>#</th>
            <th>Publikálás</th>
            <th>Műfaj</th>
            <th>Cím</th>
            <th>Poszter</th>
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
          {movies?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
            >
              <td>{index + 1}.</td>
              <td>{format(item.release, 'yyyy.MM.dd')}</td>
              <td>{item.genre.map((genre) => capitalizeWord(genre)).join(', ')}</td>
              <td>{item.title}</td>
              <td className="flex justify-center items-centers">
                <img src={item.poster} alt={item.title} className="h-20 object-contain  rounded-md" />
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
    </div>
  );
}

export default MoviesTable;
