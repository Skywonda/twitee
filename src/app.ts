import express from "express";
import errorHandler from "./middleware/errorHandler";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";
import routers from "./routes/index";

const app = express();
app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

// Import routes

// Use routes
app.use(routers);

app.use(errorHandler);
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
