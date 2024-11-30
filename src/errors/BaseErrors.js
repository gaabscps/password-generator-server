class BaseErrors extends Error {
  constructor(message = "An error occurred", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendResponse(res) {
    res
      .status(this.status)
      .send({ message: this.message, status: this.status });
  }
}

export default BaseErrors;
