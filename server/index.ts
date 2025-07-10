import express from "express";
import dotenv from "dotenv";
import path from "path";
import testingRouter from "./testing-route";
import cors from "cors";

// Load variables from ../.env (one level above the server folder)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", testingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 