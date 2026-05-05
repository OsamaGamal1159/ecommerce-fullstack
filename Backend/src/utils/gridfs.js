import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gridfsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

// Create storage engine
const createGridFSStorage = () => {
  return {
    _handleFile: function (req, file, cb) {
      const writestream = gridfsBucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });
      file.stream.pipe(writestream);
      writestream.on("finish", () => {
        cb(null, {
          filename: writestream.filename,
          id: writestream.id,
          bucketName: "uploads",
        });
      });
      writestream.on("error", cb);
    },
    _removeFile: function (req, file, cb) {
      // Remove file logic if needed
      cb(null);
    },
  };
};

export { gridfsBucket, createGridFSStorage };
