import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB(process.env.DB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
