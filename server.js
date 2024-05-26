import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";

//configure env
dotenv.config();

//Database config
connectDB();

//rest object
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1> Hello Node, It's Ash</h1>");
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
