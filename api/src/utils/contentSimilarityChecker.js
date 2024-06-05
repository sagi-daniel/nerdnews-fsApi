const stringSimilarity = require('string-similarity');

// Comparison function
const contentSimilarityChecker = (content1, content2) => {
  // Compute similarity between the texts
  const similarity = stringSimilarity.compareTwoStrings(content1, content2);

  // Return the percentage of similarity rounded to two decimal places
  return similarity * 100;
};

module.exports = contentSimilarityChecker;
