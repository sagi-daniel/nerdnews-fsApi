import { Link } from 'react-router-dom';
import Section from '../components/Section';
import GridItemSkeleton from '../components/loaders/skeletons/GridItemSkeleton';
import MovieCardSkeleton from '../components/loaders/skeletons/ImageSkeleton';
import NewsCardSkeleton from '../components/loaders/skeletons/NewsCardSkeleton';
import ImageSkeleton from '../components/loaders/skeletons/ImageSkeleton';

function Login() {
  return (
    <Section type="horizontal" space="large">
      <NewsCardSkeleton />
      <GridItemSkeleton />
      <MovieCardSkeleton />
      <ImageSkeleton />
    </Section>
  );
}

export default Login;
