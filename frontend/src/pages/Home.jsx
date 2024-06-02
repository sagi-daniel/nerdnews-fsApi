import { Link } from 'react-router-dom';
import Section from '../components/Section';
import NewsGrid from '../features/News/NewsGrid';
import MovieSlider from '../features/upcomingMovies/MovieSlider';

function Home() {
  return (
    <>
      <Section type="horizontal" space="large">
        <div className="flex flex-col md:w-2/3 p-2 border border-red-800">
          <div>
            <h1 className="text-4xl font-bold text-center md:text-left ">Üdvözlünk a weboldalon!</h1>
            <p className=" pb-6 text-center md:text-left ">
              Itt mindig naprakész információkat találsz a legújabb tech hírekről és a közelgő mozifilmekről.
              <br /> Ne maradj le semmiről, regisztrálj most, hogy élvezhesd az összes funkciót!
            </p>
          </div>

          <div className="text-center md:text-left">
            <Link to="/login" className="btn-primary-md">
              Bejelentkezés
            </Link>
          </div>
        </div>
        <div className="flex flex-col p-2 md:w-1/3 border border-red-800 ">
          <div>
            <p>valami</p>
          </div>
        </div>
      </Section>
      {/* <Section>
        <NewsGrid />
      </Section> */}
      <Section type="vertical">
        <h2>Közelgő Mozifilmek</h2>
        <MovieSlider />
      </Section>
    </>
  );
}

export default Home;
