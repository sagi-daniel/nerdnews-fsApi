const axios = require('axios');
const { parseString } = require('xml2js');
const Parser = require('rss-parser');

//*Parser for RDF structure
async function parser1(url, category, source) {
  try {
    const response = await axios.get(url);
    const xmlContent = response.data;

    return new Promise((resolve, reject) => {
      parseString(xmlContent, (err, result) => {
        if (err) {
          reject(`Error parse: ${err}`);
          return;
        }

        const feeds = result.rss.channel[0].item.map((item) => ({
          release: item.pubDate ? item.pubDate[0] : undefined,
          source,
          title: item.title ? item.title[0] : undefined,
          link: item.link ? item.link[0] : undefined,
          content: item.description ? item.description[0] : undefined,
          imageUrl: item['media:content']
            ? item['media:content'][0].$.url
              ? item['media:content'][0].$.url
              : undefined
            : undefined,
          category,
        }));

        resolve(feeds);
      });
    });
  } catch (error) {
    throw new Error(`Fetch error: ${error}`);
  }
}

//*Parser for RSS structure
async function parser2(url, category, source) {
  const parser = new Parser();
  const feeds = await parser.parseURL(url);
  const formattedFeeds = feeds.items.map((item) => ({
    release: item.pubDate ? item.pubDate : undefined,
    source,
    title: item.title ? item.title : undefined,
    link: item.link ? item.link : undefined,
    content: item.content ? item.content : undefined,
    imageUrl: item.enclosure ? item.enclosure.url : undefined,
    category,
  }));
  return formattedFeeds;
}

async function rssParser(url, category, rssSource, source) {
  try {
    let feeds = [];
    if (rssSource === 'RSS') {
      feeds = await parser2(url, category, source);
    }
    if (rssSource === 'RDF') {
      feeds = await parser1(url, category, source);
    }
    return feeds;
  } catch (error) {
    throw new Error(`Somthing went wrong with the parser: ${error}`);
  }
}

module.exports = {
  rssParser,
};
