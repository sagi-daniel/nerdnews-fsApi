import Section from '../../components/Section';

function NewsGrid() {
  const newsItems = [
    {
      image:
        'https://i.cdn29.hu/apix_collect_c/ngg_images/2406/04/bad_boys_ride_or_die_bad_boys_mindent_vagy_tobbet_164034_1_original_760x425_cover.webp',
      title: 'Ha kis dobozos társasjátékot vennél, ezekkel nem lőhetsz most mellé',
      description: 'Will Smith és Martin Lawrence 50 fölött is imádnak rosszalkodni.',
    },
    {
      image: 'https://i.cdn29.hu/apix_collect_c/ngg_images/2406/01/knarr_183236_1_original_760x425_cover.webp',
      title: 'Ha kis dobozos társasjátékot vennél, ezekkel nem lőhetsz most mellé',
      description: 'Will Smith és Martin Lawrence 50 fölött is imádnak rosszalkodni.',
    },
    {
      image:
        'https://i.cdn29.hu/apix_collect_c/ngg_images/2405/29/star_wars_skywalker_kora_venom_2_193538_1_original_760x425_cover.webp',
      title: '10 rossz film, amire valahogy mégis rengetegen váltottak jegyet',
      description: 'Will Smith és Martin Lawrence 50 fölött is imádnak rosszalkodni.',
    },
  ];

  return (
    <Section type="horizontal" space="small" gap="medium">
      <div className="relative flex flex-col h-full w-2/3 bg-black rounded-md">
        <div
          className={`flex flex-col opacity-70 justify-end h-96 bg-cover px-2 py-5 rounded-md`}
          style={{ backgroundImage: `url(${newsItems[0].image})` }}
        ></div>
        <div className=" absolute bottom-4 left-4 text-white ">
          <h3>{newsItems[0].title}</h3>
          <p>
            <span>date</span> | <span>category</span>
          </p>
          <p>{newsItems[0].description}</p>
        </div>
      </div>

      <div className=" flex flex-col gap-2 w-1/3 ">
        <div className="relative h-1/2 rounded-md bg-black ">
          <div
            className={`flex flex-col opacity-70 justify-end h-full bg-cover px-2 py-5 rounded-md`}
            style={{ backgroundImage: `url(${newsItems[1].image})` }}
          ></div>
          <div className=" absolute bottom-4 left-4 text-white ">
            <h3 className="text-sm">{newsItems[1].title}</h3>
            <p className="text-xxs">
              <span>date</span> | <span>category</span>
            </p>
          </div>
        </div>
        <div className="relative h-1/2 rounded-md bg-black ">
          <div
            className={`flex flex-col opacity-70 justify-end h-full bg-cover px-2 py-5 rounded-md`}
            style={{ backgroundImage: `url(${newsItems[2].image})` }}
          ></div>
          <div className=" absolute bottom-4 left-4 text-white ">
            <h3 className="text-sm">{newsItems[2].title}</h3>
            <p className="text-xxs">
              <span>date</span> | <span>category</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default NewsGrid;
