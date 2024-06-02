import { useQuery } from '@tanstack/react-query';
import getNews from '../../services/apiNews';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';
import Slider from '../../components/parts/slider/Slider';
import NewsCard from './NewsCard';

function NewsSlider() {
  const { data, isLoading, error, isError } = useQuery(['rssnews'], getNews);

  //   const [selectednews, setSelectednews] = useState(null);
  //   const [modalVisible, setModalVisible] = useState(false);

  //   const handlePosterClick = (news) => {
  //     setSelectednews(news);
  //     setModalVisible(true);
  //   };

  //   const closeModal = () => {
  //     setSelectednews(null);
  //     setModalVisible(false);
  //   };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <>
      {/* {modalVisible && selectednews && (
        <NewsModal
          closeModal={closeModal}
          title={selectednews.title}
          releaseDate={selectednews.release}
          overview={selectednews.overview}
        />
      )} */}
      <Slider
        items={data.data.rssNews.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      />
    </>
  );
}

export default NewsSlider;
