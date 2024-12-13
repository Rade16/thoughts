const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);
router.get("/auth", authMiddleware, controller.auth);
router.put(
  "/update-profile/:id",
  upload.single("avatar"),
  controller.updateUser
);
router.get("/user/:id", controller.getUser);
module.exports = router;
