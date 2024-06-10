interface SectionProps {
  children: React.ReactNode;
  type?: 'vertical' | 'horizontal';
  space?: 'small' | 'medium' | 'large';
  gap?: 'none' | 'small' | 'medium' | 'large';
}

function Section({ children, type = 'horizontal', space = 'small', gap = 'small' }: SectionProps) {
  const sizeAlignment: Record<string, string> = {
    vertical: 'flex-col',
    horizontal: 'flex-col md:flex-row',
  };

  const sizeSpace: Record<string, string> = {
    small: 'py-10 px-5 md:py-10 md:px-0',
    medium: 'py-10 px-5 md:py-20 md:px-0',
    large: 'py-20 px-5 md:py-40 md:px-20',
  };

  const sizeGap: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-1',
    medium: 'gap-2',
    large: 'gap-5',
  };

  return (
    <section className={`relative flex ${sizeAlignment[type]} ${sizeGap[gap]} ${sizeSpace[space]} h-full w-full`}>
      {children}
    </section>
  );
}

export default Section;
