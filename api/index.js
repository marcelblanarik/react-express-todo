const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verifyToken = require("./routes/validate-token");

dotenv.config();
const app = express();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// import routes
const authRoutes = require("./routes/auth");
const todosRoutes = require("./routes/todos");

// middlewares
app.use(express.json()); // for body parser

// route middlewares
app.use("/api/user", authRoutes);
// this route is protected with token
app.use("/api/todos", verifyToken, todosRoutes);

app.listen(5000, () => console.log("Backend is running..."));
