import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeWord } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../services/apiUser';
import { format } from 'date-fns';
import UserAvatar from '../../components/UserAvatar';
import Section from '../../components/Section';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import UpdatePasswordForm from '../../features/auth/forms/UpdatePasswordForm';
import UserForm from '../../components/forms/UserForm';
import Alert from '../../components/Alert';
import CustomNavLink from '../../components/CustomNavLink';
import Slider from '../../components/parts/slider/Slider';
import NewsModel from '../../models/News.model';
import NewsCard from '../../features/news/NewsCard';
import MovieModel from '../../models/Movie.model';
import MovieDetails from '../../features/movies/MovieDetails';
import MovieCard from '../../features/movies/MovieCard';

const MyAccount = () => {
  const { user, logout } = useAuth();
  const { news, movies } = useUser();
  const [isPasswordUpdateShow, setIsPasswordUpdateShow] = useState(false);
  const [isUserUpdateShow, setIsIsUserUpdateShow] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
  const [moviemodalVisible, setMovieModalVisible] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: () => {
      logout();
      navigate('/deleteAccountConfrim');
      queryClient.invalidateQueries(['users']);
    },
  });

  function handleDelete(userId: string) {
    setUserIdToDelete(userId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (userIdToDelete) {
      deleteUserMutate(userIdToDelete);
      setConfirmationVisible(false);
      setUserIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setUserIdToDelete(null);
  };

  const handlePosterClick = (movie: MovieModel) => {
    setSelectedMovie(movie);
    setMovieModalVisible(true);
  };

  return (
    <>
      <Section type="horizontal" space="small" gap="large">
        <div className="flex flex-col md:w-3/12 w-full">
          <h1 className="text-3xl font-bold mb-6">Felhasználói fiók</h1>
          <div className="flex items-center space-x-4 mb-6">
            {user && <UserAvatar user={user} size="large" />}

            <div>
              <h2 className="text-2xl font-semibold">{user && user.userName}</h2>
              <p className="">{user && user.email}</p>
            </div>
          </div>
          <div className="bg-border-dark text-content-dark p-4 rounded-md">
            <ol>
              <li>
                Szerepkör: <span className="font-semibold text-primary">{capitalizeWord(user?.role)}</span>
              </li>
              <li>
                Regisztráció: <span className="font-semibold"> {user && format(user.createdAt, 'yyyy.MM.dd')}</span>
              </li>
              <li>
                Adatváltoztatás: <span className="font-semibold">{user && format(user.updatedAt, 'yyyy.MM.dd')}</span>
              </li>
            </ol>
            <div className="flex items-center space-x-2 mt-4">
              <Button type="button" size="normal" text="Szerkeszt" onClick={() => setIsIsUserUpdateShow(true)} />
              <Button type="button" size="normal" text="Jelszó csere" onClick={() => setIsPasswordUpdateShow(true)} />
            </div>
          </div>
          {user && (
            <div>
              <CustomNavLink
                text="Fiók törlése"
                className="text-error text-[12px]"
                onClick={() => handleDelete(user?._id)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col md:w-9/12 w-full">
          <h2 className="text-3xl font-bold mb-6">Mentett Hírek</h2>
          <Slider moreLabel={'Még több mentett hír...'} morePath={'/myNews'}>
            {news?.map((news: NewsModel) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </Slider>
          <h2 className="text-3xl font-bold mb-6">Mentett Filmek</h2>
          <Slider moreLabel={'Még több mentett mozifilm...'} morePath={'/myMovies'}>
            {movies &&
              movies.map((movie: MovieModel) => (
                <MovieCard key={movie._id} movie={movie} onClick={handlePosterClick} />
              ))}
          </Slider>
          <Modal isOpen={moviemodalVisible} setIsOpen={setMovieModalVisible}>
            {selectedMovie && <MovieDetails movie={selectedMovie} />}
          </Modal>
        </div>
      </Section>
      <Modal isOpen={isPasswordUpdateShow} setIsOpen={setIsPasswordUpdateShow}>
        <UpdatePasswordForm />
      </Modal>
      <Modal isOpen={isUserUpdateShow} setIsOpen={setIsIsUserUpdateShow}>
        <UserForm user={user} setModalVisible={() => true} />
      </Modal>
      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné a felhasználói fiókját?"
          alertDescription="Először 90 napig zároljuk, majd utána véglegesen töröljük a fiókot."
          buttonText="Mégsem"
          buttonStyle="neutral"
          buttonAction={cancelDelete}
          confrimText="Töröl"
          confrimStyle="delete"
          confirmAction={confirmDelete}
        />
      </Modal>
    </>
  );
};

export default MyAccount;
