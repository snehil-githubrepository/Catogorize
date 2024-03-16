import express from "express";
import * as userController from "./../controller/userController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User Route is here");
});

// create a new user
router.post("/users", userController.createUser);

// specific user
router.get("/users/:userId", userController.getUserById);

// update a user's information
router.put("/users/:userId", userController.updateUser);

// delete a user
router.delete("/users/:userId", userController.deleteUser);

// follow another user
router.post("/users/:userId/follow", userController.followUser);

// unfollow another user
// router.post("/users/:userId/unfollow", userController.unfollowUser);

export default router;
