const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
const httpLogger = require("./middleware/httpLogger");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(httpLogger);

app.use("/api/v1", routes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;