const mongoose = require("mongoose");
const config = require("../../config/default.json");
const logger = require("./config/logger");
const app = require("./server");

mongoose
  .connect(
    `mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`
  )
  .then(() => {
    logger.info("Mongodb connection is successful!");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
