const designController = require("../controllers/designController");
const auth = require("../middlewares/middlewares");

const router = require("express").Router();

router.post("/create-user-design", auth, designController.createDesign);
router.get("/user_design/:designId", auth, designController.getUserDesign);
router.put(
  "/update-user-design/:designId",
  auth,
  designController.updateUserDesign,
);
router.post("/add-user-image", auth, designController.addUserImage);
router.get("/get-user-image", auth, designController.getUserImage);

module.exports = router;
