import { Router } from "express";

import { createUser, login, logout } from "../controllers/auth-controllers.js";

const router = Router();

router.get("/login", (req, res) => {
  if (req.query.registration === "success") {
    return res.render("login", {
      message: "Registration was successfull. Now login to continue",
    });
  }
  res.render("login", { message: "" });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);
export default router;
