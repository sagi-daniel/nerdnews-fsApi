import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMovie } from '../../services/apiMovies';
import { formatDateIsoToNormal } from '../../utils/helpers';
import InputField from '../form-ui/InputField';
import Button from '../Button';
import toast from 'react-hot-toast';

import TextAreaField from '../form-ui/TextAreaField';
import MovieModel from '../../models/Movie.model';

interface MovieFormProps {
  movie?: MovieModel | null;
  setModalVisible: (value: boolean) => void;
}

function MovieForm({ movie, setModalVisible }: MovieFormProps) {
  const [release, setRelease] = useState(formatDateIsoToNormal(movie?.release) || '');
  const [title, setTitle] = useState(movie?.title || '');
  const [overview, setOverview] = useState(movie?.overview || '');
  const [poster, setPoster] = useState(movie?.poster || '');

  const queryClient = useQueryClient();

  const { mutate: upadateMovieMutate } = useMutation(updateMovie, {
    onSuccess: () => {
      toast.success(`Film frissítve!`);
      queryClient.invalidateQueries(['movie']);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const saveMovie = {
      release,
      title,
      overview,
      poster,
    };

    if (movie && movie._id) {
      const upadteMovie = { ...movie, ...saveMovie };
      const movieId = movie._id;
      upadateMovieMutate({ movie: upadteMovie, movieId });
      setModalVisible(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        <InputField
          type="date"
          id="release"
          name="release"
          label="Publikálás"
          value={release}
          setValue={setRelease}
          required={true}
        />
      </div>
      <TextAreaField id="title" name="title" label="Cím" value={title} setValue={setTitle} required={true} row={3} />
      <InputField
        type="text"
        id="poster"
        name="poster"
        label="Kép"
        value={poster}
        setValue={setPoster}
        required={true}
      />
      <TextAreaField
        label="Tartalom"
        id="overview"
        name="overview"
        value={overview}
        setValue={setOverview}
        isValid={overview.length > 0}
        row={5}
        errorMessage="A tartalom megadása kötelező"
        successMessage="Overview is valid"
        required={true}
      />
      <Button type="submit" text={movie ? 'Mentés' : 'Létrehozás'} size="full" />
    </form>
  );
}

export default MovieForm;
