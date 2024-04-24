import { getUser } from "../controllers/auth-controllers.js";

async function checkUser(req, res, next) {
  try {
    const userid = req.cookies?.uid;

    if (!userid) return res.redirect("/user/login");
    const user = getUser(userid);

    if (!user) return res.redirect("/user/login");

    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
  }
}

export { checkUser };
