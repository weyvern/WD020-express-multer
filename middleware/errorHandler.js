const errorHandler = (err, req, res, next) => {
  res.send(`<h1>${err.message}</h1>`);
};

export default errorHandler;
