import db from "../model";
import { Request, Response } from "express";

class FileController {
  static async addFile(request: Request, response: Response) {
    if (request.files) {
      const { name, size, data }: any = request.files.file;
      const file = await db.models.File.create({
        fileName: name,
        fileSize: size,
        data: data,
      });
      response.status(201).json("created");
    } else {
      response.send("Not added to database.");
      console.log("Not added to database.");
    }
  }

  static async getFiles(request: Request, response: Response) {
    const files = await db.models.File.findAll();
    response.json(files);
  }

  static async deleteFile(request: Request, response: Response) {
    const { id } = request.query;
    await db.models.File.destroy({
      where: {
        id: id,
      },
    });
    response.json("deleted");
  }
}

export default FileController;
