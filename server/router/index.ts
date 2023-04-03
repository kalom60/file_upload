import express from "express";
import FileController from "../controller/FIleController";

const router: express.Router = express.Router();

router.post("/file", FileController.addFile);
router.get("/file", FileController.getFiles);

export default router;
