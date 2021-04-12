const express = require("express");
const app = express();
const creditApi = require("./routes/api");
const cors = require("cors");

//middlewares
app.use(cors());
app.set("port", 4000);
app.use(express.json());
creditApi(app);
app.listen(app.get("port"), function () {
  console.log(`Listening http://localhost:${app.get("port")}`);
});
