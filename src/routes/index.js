const siteRouter = require("./site"),
  phimRouter = require("./phim");

const route = (app) => {
  app.use("/phim", phimRouter);
  app.use("/", siteRouter);
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "404 not found",
    });
  });
};

module.exports = route;
