const cors = require("cors");
const app = require("./app");
require("dotenv").config();

app.use(cors({
  origin: "http://localhost:3000", // Frontend origin
  methods: ["GET", "POST"],
  credentials: true
}));

const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${PORT}`);
});