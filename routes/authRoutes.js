const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/user-register", authController.userRegister);
router.post("/user-login", authController.userLogin);

module.exports = router;
