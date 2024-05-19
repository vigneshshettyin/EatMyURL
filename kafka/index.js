const express = require("express");

const HomeController = require("./controller/home");
const Producer = require("./controller/produceController");

const app = express();

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get("/", HomeController.index);

app.post("/produce", Producer.respond);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
