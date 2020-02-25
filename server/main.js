import express from "express";
import bp from "body-parser";
import DbContext from "./db/dbconfig";
import Socket from "./Socket/SocketService";
import cors from "cors";

const server = express();
const socketServer = require("http").createServer(server);
const io = require("socket.io")(
  socketServer /*, {
  path: '',
  pingTimeout: 10000
}*/
);
var port = process.env.PORT || 3000;
server.use(express.static(__dirname + "/../client/dist"));
// io.listen(port);
//Fire up database connection
DbContext.connect();
Socket.setIO(io);

const whitelist = ["http://localhost:8080"];
const corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions));

//REGISTER MIDDLEWEAR
server.use(bp.json());
server.use(
  bp.urlencoded({
    extended: true
  })
);

//REGISTER YOUR SESSION, OTHERWISE YOU WILL NEVER GET LOGGED IN
import UserController from "./controllers/UserController";
import Session from "./middleware/session";
server.use(new Session().express);
server.use("/account", new UserController().router);

//YOUR ROUTES HERE!!!!!!
import QuizController from "./controllers/QuizController";
import ProfileController from "./controllers/ProfileController";
server.use("/api/quizes", new QuizController().router);
server.use("/api/profiles", new ProfileController().router);

//? Default error handler, catches all routes with an error attached
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

//Catch all
server.use("*", (req, res, next) => {
  res.status(404).send({
    error: "No matching routes"
  });
});

const listenServer = socketServer.listen(port, () => {
  console.log("server running on port", port);
});
