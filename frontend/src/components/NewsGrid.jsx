function NewsGrid({ news }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <div className="bg-gray-100 p-4">
          <h1 className="text-2xl font-bold">Legfrissebb hír</h1>
          <p className="text-sm"> {news[0].title} </p>
          <p className="text-sm text-gray-600"> {news[0].content} </p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid grid-cols-1 gap-4">
          {news.slice(1).map((item, index) => (
            <div key={index} className="bg-gray-100 p-4">
              <h2 className="text-xl font-bold">Hír {index + 2}</h2>
              <p className="text-sm"> {item.title} </p>
              <p className="text-sm text-gray-600"> {item.content} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsGrid;
