import NewsCarousel from '../features/News/news-caruosel/NewsCarousel';

function Home() {
  return (
    <div>
      <h1 className=" text-foreground-dark darkMode:text-foreground-light text-3xl font-bold underline">
        Hello world!
      </h1>
      <NewsCarousel />
    </div>
  );
}

export default Home;
