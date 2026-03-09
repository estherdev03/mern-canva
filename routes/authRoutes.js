const authController = require("../controllers/authController");
const auth = require("../middlewares/middlewares");

const router = require("express").Router();

router.post("/user-register", authController.userRegister);
router.post("/user-login", authController.userLogin);
router.get("/user", auth, authController.getUserById);

router.get("/auth/google", authController.googleAuth);
router.get("/auth/google/callback", authController.googleCallback);

module.exports = router;
