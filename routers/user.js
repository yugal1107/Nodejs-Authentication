import { Router } from "express";

import { createUser } from "../controllers/auth-controllers.js";
import { login } from "../controllers/auth-controllers.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", createUser);
router.post("/login", login);

export default router;
