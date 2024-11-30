import BaseErrors from "./BaseErrors.js";

class InvalidData extends BaseErrors {
  constructor(message = "Invalid data input") {
    super(message, 400);
  }
}

export default InvalidData;
