import moongose from "mongoose";

function errorHandler(error, req, res, next) {
  if (error instanceof moongose.Error.CastError) {
    res.status(400).send({ message: "Invalid data input" });
  } else {
    res.status(500).send({ message: "Internal server error" });
  }
}

export default errorHandler;
