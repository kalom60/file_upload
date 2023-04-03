import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import router from "./router";
import db from "./model";

const PORT: number = 5000;
const app = express();

(async () => {
  await db.sequelize.sync();
})();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
