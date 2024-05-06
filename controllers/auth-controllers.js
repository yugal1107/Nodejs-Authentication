import mongoose from "mongoose";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

//Statefull Authentication

// Map to store uids and users
// const idtousermap = new Map(); //not reqiured in stateless authentication
//This storage is disadvantage of statefull authentication which increase the memory usage in server and if server is restart , it will lost the data

// async function getUser(uid) {
//   return idtousermap.get(uid);
// }

// async function setUser(uid, user) {
//   idtousermap.set(uid, user);
// }

//Stateless Authentication

const secretkey = "mysecretkey";

function getUser(token) {
  try {
    const userid = jwt.verify(token, secretkey);
    if (!userid) return null;
    return userid;
  } catch (error) {
    console.log("Error while verifying token:", error.message);
  }
}

function setUser(user) {
  console.log("User signed successfully");
  try {
    return jwt.sign(user, secretkey);
  } catch (error) {
    res.status(500).send("Error while signing token:", error.message);
    console.log("Error while signing token:", error.message);
  }
}

function createUser(req, res) {
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
  })
    .then(() => {
      console.log("User created successfully");
      res.redirect("/user/login?registration=success");
    })
    .catch((error) => {
      console.log("Error:", error.message);
      res.status(500).send("An error occured while creating user");
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      if (user) {
        //Statefull Authentication
        // const userid = uuidv4();
        // setUser(userid, user);
        // res.cookie("uid", userid);
        // console.log("User logged in successfully");
        // return res.redirect("/home");

        // Stateless Authentication
        console.log("User finded successfully");
        res.cookie("uid", setUser(user));
        return res.redirect("/home");
      } else {
        console.log("Invalid email or password");
        res.send("Invalid email or password");
      }
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
}

function logout(req, res) {
  //Statefull Authentication
  // idtousermap.delete(req.cookies.uid);
  // res.clearCookie("uid");
  // console.log("User logged out successfully");
  // return res.redirect("/user/login");

  // Stateless Authentication
  res.clearCookie("uid");
  console.log("User logged out successfully");
  return res.redirect("/user/login");
}

export { createUser, login, getUser, setUser, logout };
