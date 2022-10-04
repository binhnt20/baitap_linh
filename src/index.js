require("dotenv").config({ path: __dirname + "/./../.env" });
const path = require("path"),
  express = require("express"),
  methodOverride = require("method-override"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  route = require("./routes"),
  db = require("./config/db"),
  port = +process.env.PORT,
  cors = require("cors"),
  app = express(),
  server = require("http").Server(app);

db.connect();

global.tokenList = [];
global.accessTokenLife = process.env.TOKEN_LIFE;
global.accessTokenSecret = process.env.SECRET;
global.refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
global.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
  })
);
app.use(bodyParser.json());
server.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});

app.use(cors());
route(app);
