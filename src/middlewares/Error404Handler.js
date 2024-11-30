import NotFound from "../errors/NotFound.js";

function Error404Handler(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default Error404Handler;
