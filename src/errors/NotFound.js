import BaseErrors from "./BaseErrors.js";

class NotFound extends BaseErrors {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export default NotFound;
