// Default values for query parameters
const DEFAULTS = {
  PAGE_SIZE: null,
  PAGE: 0,
  SORT_ORDER: -1, // desc
  DATE_RANGE: 6,
};

// Function to handle date parsing with defaults
const parseDate = (dateString, dateType) => {
  const currentDate = new Date();
  if (dateString) {
    return new Date(dateString);
  } else {
    if (dateType === 'from') {
      return new Date(currentDate.setMonth(currentDate.getMonth() - DEFAULTS.DATE_RANGE));
    } else if (dateType === 'to') {
      return new Date(currentDate.setMonth(currentDate.getMonth() + DEFAULTS.DATE_RANGE));
    }
  }
};

// Function to handle pagination parameters
const parsePaginationParams = (query, pageSize = null, page = 0) => {
  const parsedPageSize = parseInt(query.pageSize, 10) || pageSize;
  const parsedPage = parseInt(query.page, 10) || page;
  return {
    pageSize: parsedPageSize < 1 ? pageSize : parsedPageSize,
    page: parsedPage < 0 ? page : parsedPage,
  };
};

// Function to handle sort order
const parseSortOrder = (sortOrder) => {
  if (sortOrder) {
    if (sortOrder.toLowerCase() === 'asc') return 1;
    if (sortOrder.toLowerCase() === 'desc') return -1;
    // return new AppError('Invalid sortOrder parameter. Use "asc" or "desc".', 400);
  }
  return -1;
};

module.exports = { parseDate, parsePaginationParams, parseSortOrder };
