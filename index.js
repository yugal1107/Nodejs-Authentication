import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ejs from "ejs";
import userRouter from "./routers/user.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/auth-middlewares.js";

dotenv.config();
const app = express();

//Setting up view engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public")); //To serve static files
app.use(express.urlencoded({ extended: true })); //To parse the form data
app.use(cookieParser()); //To parse the cookies

//Checking user
app.use("/home" , checkUser);

//Setting routes
app.use("/user", userRouter);

//Connection with mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

//Setting up PORT
const PORT = process.env.PORT || 3000;

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/" , (req , res) => {
  res.redirect("/home");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
