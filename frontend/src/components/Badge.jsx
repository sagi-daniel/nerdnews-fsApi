function Badge({ categoryName = 'DEFAULT' }) {
  const categoriesColorOptions = {
    DEFAULT: 'bg-secondary text-secondary-content',
    TECH: 'bg-tech text-tech-content',
    CYBERSEC: 'bg-cybersec text-cybersec-content',
    GAMING: 'bg-gaming text-gaming-content',
  };

  return (
    <span className={` ${categoriesColorOptions[categoryName]} px-4 py-2 text-lg font-semibold rounded`}>
      {categoryName}
    </span>
  );
}

export default Badge;
