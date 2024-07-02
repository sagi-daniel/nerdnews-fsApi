import Button from '../components/Button';
import Section from '../components/Section';

function TestPage() {
  return (
    <Section>
      <Button type="submit" text="Button Primary" size="normal" style="primary" />
      <Button type="button" text="Button Neutral" size="normal" style="neutral" />
      <Button type="button" text="Button Cancel" size="normal" style="cancel" />
    </Section>
  );
}

export default TestPage;
