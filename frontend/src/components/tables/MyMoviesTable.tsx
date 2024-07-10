import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';
import { capitalizeWord } from '../../utils/helpers';
import MovieModel from '../../models/Movie.model';
import Modal from '../Modal';
import MovieDetails from '../../features/movies/MovieDetails';

interface MyMoviesTableProps {
  movies: MovieModel[];
  onDelete?: (id: string) => void;
}

function MyMoviesTable({ movies, onDelete }: MyMoviesTableProps) {
  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePosterClick = (movie: MovieModel) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };
  return (
    <div className="flex size-full items-start">
      <table className=" w-full bg-border-dark text-center text-content-dark rounded-md">
        <thead>
          <tr className="h-20">
            <th>Megjelenés</th>
            <th className="md:table-cell hidden">Műfaj</th>
            <th>Cím</th>
            <th>Poszter</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-t border-border-light ${index % 2 !== 0 ? 'bg-border-dark' : 'bg-bg-dark'}`}
            >
              <td>{format(item.release, 'yyyy.MM.dd')}</td>
              <td className="md:table-cell hidden">{item.genre.map((genre) => capitalizeWord(genre)).join(', ')}</td>
              <td>{item.title}</td>
              <td className="flex justify-center items-centers">
                <div className="relative h-20 w-10 cursor-pointer  ">
                  <div className={`relative size-full  no-select overflow-hidden rounded-md`}>
                    <div
                      onClick={() => handlePosterClick(item)}
                      className={`size-full  select-none justify-end rounded-md bg-cover bg-center ease-in-out hover:scale-105 transition-transform duration-500 `}
                      style={{ backgroundImage: `url(${item.poster})` }}
                    />
                  </div>
                </div>
              </td>
              <td>
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
      <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
      </Modal>
    </div>
  );
}

export default MyMoviesTable;
