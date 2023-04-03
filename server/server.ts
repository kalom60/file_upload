import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const PORT: number = 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
