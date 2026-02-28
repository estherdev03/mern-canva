const designController = require("../controllers/designController");
const auth = require("../middlewares/middlewares");

const router = require("express").Router();

router.post("/create-user-design", auth, designController.createDesign);

module.exports = router;
