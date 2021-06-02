const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const connectdb = require("./api/middlewares/connectdb.js");
const authorise = require("./api/middlewares/authorise.js");
const routes = require("./api/routes/index.js");
const { whitelist } = require("./utility/constants.js");

//server config
dotenv.config({ silent: process.env.NODE_ENV === "production" });
const server = express();
const httpServer = http.Server(server);
const PORT = process.env.PORT || 9000;

var corsOptions = {
  origin: whitelist,
  credentials: true,
};

//middleWare
server.use(express.json());
server.use(cors(corsOptions));
server.use(cookieParser());

//custom middleware
server.use(connectdb);
server.use(authorise);

//routes
server.use("/",routes)

httpServer.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`, Date.now());
});
