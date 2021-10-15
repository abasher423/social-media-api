import express from "express";
import controller from "../controllers/posts";
const router = express.Router();

router.get("/", controller.posts_get_all);

router.get("/:postId", controller.posts_get_post);

router.post("/", controller.posts_create_post);

router.put("/:postId", controller.posts_update_post);

router.delete(":/postId", controller.posts_delete_post);

export default router;
