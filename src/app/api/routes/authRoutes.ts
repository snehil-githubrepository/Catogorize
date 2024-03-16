import express from "express";
import * as authController from "./../controller/authController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Authentication Route");
});

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
