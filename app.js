const express = require("express");
const router = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on port", port);
});
