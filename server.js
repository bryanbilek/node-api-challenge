const express = require("express");
const server = express();
const helmet = require("helmet");

const actionRouter = require("./actions/actionRouter");
const projectRouter = require("./projects/projectRouter");

//middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Sprint Challenge: Node & Express - Projects & Actions!</h2>`);
});

//custom middleware logger
function logger(req, res, next) {
  console.log(`[${new Date().toISOString}] ${req.method} to ${req.url} from ${req.get("Origin")}`);
  next();
}

module.exports = server;