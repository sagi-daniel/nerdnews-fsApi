function NewsCard({ news }) {
  const { imageUrl, category, title, contentSnippet } = news;

  // Function to truncate the description to 20 characters
  const truncateDescription = (text) => {
    if (text.length <= 40) {
      return text;
    }
    return text.slice(0, 40) + '...';
  };

  return (
    <div className="flex flex-col justify-between max-w-sm  outline outline-border-light dark:outline-border-dark bg-border-dark dark:bg-bg-light text-content-dark dark:text-content-light rounded-md h-full">
      <div className="">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4" />
        <small className="px-1">{category.categoryName}</small>
        <h3 className="px-1 text-lg font-bold mt-1">{title}</h3>
        <p className=" px-1 mt-2">{truncateDescription(contentSnippet)}</p>
      </div>
      <div className="p-3 flex items-end justify-start mt-4">
        <img src="./assets/logo/logo-light.svg" alt="Source Logo" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
}

export default NewsCard;
