import moongose from "mongoose";
import BaseErrors from "../errors/BaseErrors.js";
import InvalidData from "../errors/invalidData.js";
import ValidationError from "../errors/ValidationError.js";
import NotFound from "../errors/NotFound.js";

function errorHandler(error, req, res, next) {
  if (error instanceof moongose.Error.CastError) {
    new InvalidData().sendResponse(res);
  } else if (error instanceof moongose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof NotFound) {
    error.sendResponse(res);
  } else {
    new BaseErrors().sendResponse(res);
  }
}

export default errorHandler;
