exports.responseHandler = ({ res, data, message, status_code }) => {
  res.status(status_code || 200).json({ data, message });
};
