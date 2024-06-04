import Section from '../components/Section';
import NewsSlider from '../features/News/NewsSlider';

function News() {
  return (
    <Section type="vertical">
      <h2>Legfrisebb hírek:</h2>
      <NewsSlider />
    </Section>
  );
}

export default News;
