const designController = require("../controllers/designController");
const auth = require("../middlewares/middlewares");

const router = require("express").Router();

router.post("/create-user-design", auth, designController.createDesign);
router.get("/user-design/:designId", auth, designController.getUserDesign);
router.put(
  "/update-user-design/:designId",
  auth,
  designController.updateUserDesign,
);
router.post("/add-user-image", auth, designController.addUserImage);
router.get("/get-user-image", auth, designController.getUserImage);
router.get("/get-background-images", auth, designController.getBackgroundImage);
router.get("/get-design-images", auth, designController.getDesignImage);
router.get("/get-user-designs", auth, designController.getUserDesigns);
router.put(
  "/delete-user-image/:designId",
  auth,
  designController.deleteUserImage,
);

module.exports = router;
