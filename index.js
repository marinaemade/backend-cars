const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const UsersRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log("DB NOT CONNECTED");
  });

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "done",
  });
});

app.use("/users", UsersRoutes);

app.get("/cars", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Cars found successfully!",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Wrong Route",
  });
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

module.exports = app;
