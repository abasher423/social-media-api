import express from "express";
import {
  users_get_all,
  users_register,
  users_get_user,
  users_login,
} from "../controllers/users";

const router = express.Router();

router.get("/", users_get_all);

router.get("/:userId", users_get_user);

router.post("/register", users_register);

router.post("/login", users_login);

router.put("/:userId");

router.delete("/:userId");

export default router;
