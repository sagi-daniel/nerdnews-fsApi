const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const logger = require("./config/logger");
const app = require("./app");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}`
  )
  .then(() => {
    logger.info("Mongodb connection is successful!");
  })
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT:${process.env.PORT}`);
});
