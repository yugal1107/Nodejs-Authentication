import { getUser } from "../controllers/auth-controllers.js";

function checkUser(req, res, next) {
  try {
    const uid = req.cookies?.uid;
    if (!uid) {
      console.log("Cookie not found")
      return res.redirect("/user/login");
    }
    const user = getUser(uid);
    if (!user) {
      console.log("User not found")
      return res.redirect("/user/login");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
  }
}

export { checkUser };
