import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server running on port 3000");
});
