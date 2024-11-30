import BaseErrors from "./BaseErrors.js";

class ValidationError extends BaseErrors {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((value) => value.message)
      .join("; ");
    super(`The following errors were found ${errorMessage}`, 400);
  }
}

export default ValidationError;
