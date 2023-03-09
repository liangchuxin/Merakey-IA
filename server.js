const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*",
  origin: "http://localhost:8000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.options(
  "*",
  cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));

app.use(cors(corsOptions));
// app.use(cors())
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.json({ message: "Welcome to Merakey." });
});
require("./app/routes/game.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/topic.routes")(app);
require("./app/routes/record.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/qsrecord.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const db = require("./app/models");
const Role = db.role;

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
    // initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }
