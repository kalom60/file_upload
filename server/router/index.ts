import express from "express";
import FileController from "../controller/FIleController";

const router: express.Router = express.Router();

router.post("/file", FileController.addFile);

export default router;
