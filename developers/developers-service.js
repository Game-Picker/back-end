module.exports = {
  noCors,
};

function noCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
}
