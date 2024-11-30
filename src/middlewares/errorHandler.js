import moongose from "mongoose";
import BaseErrors from "../errors/BaseErrors.js";
import InvalidData from "../errors/InvalidData.js";
import ValidationError from "../errors/ValidationError.js";

function errorHandler(error, req, res, next) {
  if (error instanceof moongose.Error.CastError) {
    new InvalidData().sendResponse(res);
  } else if (error instanceof moongose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof BaseErrors) {
    error.sendResponse(res);
  } else {
    new BaseErrors().sendResponse(res);
  }
}

export default  errorHandler;
