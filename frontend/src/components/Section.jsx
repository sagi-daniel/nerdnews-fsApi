function Section({ children, type = 'horizontal', space = 'small' }) {
  const sizeAlignment = {
    vertical: 'flex-col',
    horizontal: 'flex-col md:flex-row',
  };

  const sizeSpace = {
    small: 'py-10 px-5 md:py-10 md:px-0',
    medium: 'py-10 px-5 md:py-20 md:px-0',
    large: 'py-20 px-5 md:py-40 md:px-20',
  };

  return <section className={`flex ${sizeAlignment[type]} gap-5  ${sizeSpace[space]}  w-full`}>{children}</section>;
}

export default Section;
