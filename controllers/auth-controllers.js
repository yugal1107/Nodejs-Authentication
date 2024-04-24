import mongoose from "mongoose";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

//Statefull Authentication
// Map to store uids and users
const idtousermap = new Map();
//This storage is disadvantage of statefull authentication which increase the memory usage in server and if server is restart , it will lost the data

function getUser(uid) {
  return idtousermap.get(uid);
}

function setUser(uid, user) {
  idtousermap.set(uid, user);
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
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });

  console.log("User created successfully");
  res.send("User created successfully");
}

function login(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      if (user) {
        //Statefull Authentication
        const userid = uuidv4();
        setUser(userid, user);
        res.cookie("uid", userid);
        console.log("User logged in successfully");
        return res.send("Hello", user.name, "You are logged in successfully");

        // Stateless Authentication
      } else {
        console.log("Invalid email or password");
        res.send("Invalid email or password");
      }
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
}

export { createUser, login, getUser, setUser };
