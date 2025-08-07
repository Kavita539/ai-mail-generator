const app = require("./app");
require("dotenv").config();

const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${PORT}`);
});