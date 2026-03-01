const authController = require("../controllers/authController");
const auth = require("../middlewares/middlewares");

const router = require("express").Router();

router.post("/user-register", authController.userRegister);
router.post("/user-login", authController.userLogin);
router.get("/user", auth, authController.getUserById);

module.exports = router;
