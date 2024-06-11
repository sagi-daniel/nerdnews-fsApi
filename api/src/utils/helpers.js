// Default values for query parameters
const DEFAULTS = {
  PAGE_SIZE: null,
  PAGE: 0,
  SORT_ORDER: -1, // desc
  DATE_RANGE: 6,
};

// Function to handle date parsing with defaults
const parseDate = (dateString) => {
  const currentDate = new Date();
  return dateString
    ? new Date(dateString)
    : new Date(currentDate.setMonth(currentDate.getMonth() - DEFAULTS.DATE_RANGE));
};

// Function to handle pagination parameters
const parsePaginationParams = (query) => {
  const pageSize = parseInt(query.pageSize, 10) || DEFAULTS.PAGE_SIZE;
  const page = parseInt(query.page, 10) || DEFAULTS.PAGE;
  return {
    pageSize: pageSize < 1 ? DEFAULTS.PAGE_SIZE : pageSize,
    page: page < 0 ? DEFAULTS.PAGE : page,
  };
};

// Function to handle sort order
const parseSortOrder = (sortOrder, next) => {
  if (sortOrder) {
    if (sortOrder.toLowerCase() === 'asc') return 1;
    if (sortOrder.toLowerCase() === 'desc') return -1;
    next(new AppError('Invalid sortOrder parameter. Use "asc" or "desc".', 400));
  }
  return DEFAULTS.SORT_ORDER;
};

module.exports = { parseDate, parsePaginationParams, parseSortOrder };
