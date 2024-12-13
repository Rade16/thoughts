const Router = require("express");
const router = new Router();
const controller = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create/:id", authMiddleware, controller.create);
router.post("/add-to-favorites", controller.addToFavorites);
router.post(
  "/remove-from-favorites",
  authMiddleware,
  controller.removeFromFavorites
);
router.get("/all-posts", controller.getAllPosts);

router.get("/favorites/:id", authMiddleware, controller.getFavoritePosts);

router.get("/my-posts/:id", authMiddleware, controller.getMyPosts);

router.get("/post/:id", controller.getPostById);

module.exports = router;
