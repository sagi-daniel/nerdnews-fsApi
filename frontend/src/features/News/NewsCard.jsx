function NewsCard({ news }) {
  const truncatedSnippet =
    news.contentSnippet.length > 50 ? `${news.contentSnippet.substring(0, 50)}...` : news.contentSnippet;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden h-96">
      <img className="w-full h-48 object-cover object-center" src={news.imageUrl} alt={news.title} />
      <div className="p-6">
        <h3 className="font-bold text-gray-800 mb-2">{news.title}</h3>
        <p className="text-gray-700 text-base">{truncatedSnippet}</p>
        <div className="mt-4">
          <a href={news.link} className="text-indigo-500 hover:text-indigo-600 font-semibold text-sm">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
