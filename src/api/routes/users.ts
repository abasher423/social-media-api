import express from "express";
import controller from "../controllers/users";

const router = express.Router();

router.get("/", controller.users_get_all);

router.get("/:userId", controller.users_get_user);

router.post("/register", controller.users_register);

router.post("/login", controller.users_login);

router.put("/:userId", controller.users_update_user);

router.delete("/:userId", controller.users_delete_user);

export default router;
