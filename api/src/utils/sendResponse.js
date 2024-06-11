// Helper function to send JSON responses
const sendResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    ...data,
  });
};

module.exports = sendResponse;
