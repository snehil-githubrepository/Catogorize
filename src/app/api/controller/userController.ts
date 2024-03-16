import { Request, Response } from "express";

let users: any[] = [];

export const createUser = (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Create a new user object
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    followers: [],
    following: [],
  };

  // Add the new user to the list
  users.push(newUser);

  res.status(201).json({ message: "User created successfully", user: newUser });
};

// Function to get information about a specific user by ID
export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  // Find the user in the users array
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
};

export const updateUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const { username, email, password } = req.body;

  // Find the index of the user in the users array
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user's information
  users[index].username = username;
  users[index].email = email;
  users[index].password = password;

  res.json({ message: "User updated successfully", user: users[index] });
};

export const deleteUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  // Filter out the user to be deleted
  users = users.filter((user) => user.id !== userId);

  res.json({ message: "User deleted successfully" });
};

export const followUser = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const { userIdToFollow } = req.body;

  // Find the index of the current user and the user to follow
  const userIndex = users.findIndex((user) => user.id === userId);
  const userToFollowIndex = users.findIndex(
    (user) => user.id === userIdToFollow
  );

  if (userIndex === -1 || userToFollowIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the user is already following the user to follow
  if (users[userIndex].following.includes(userIdToFollow)) {
    return res
      .status(400)
      .json({ error: "You are already following this user" });
  }

  // Add the user to follow to the current user's following list
  users[userIndex].following.push(userIdToFollow);

  // Add the current user to the user to follow's followers list
  users[userToFollowIndex].followers.push(userId);

  res.json({ message: "User followed successfully" });
};

// export const unfollowUser = (req: Request, res: Response) => {
//   const userId = parseInt(req.params.userId);
//   const { userIdToUnfollow } = req.body;

//   // Find the index of the current user and the user to unfollow
//   const userIndex = users.findIndex((user) => user.id === userId);
//   const userToUnfollowIndex = users.findIndex(
//     (user) => user.id === userIdToUnfollow
//   );

//   if (userIndex === -1 || userToUnfollowIndex === -1) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Check if the user is not following the user to unfollow
//   if (!users[userIndex].following.includes(userIdToUnfollow)) {
//     return res.status(400).json({ error: "You are not following this user" });
//   }

//   // Remove the user to unfollow from the current user's following list
//   users[userIndex].following = users[userIndex].following.filter(
//     (id) => id !== userIdToUnfollow
//   );

//   // Remove the current user from the user to unfollow's followers list
//   users[userToUnfollowIndex].followers = users[
//     userToUnfollowIndex
//   ].followers.filter((id) => id !== userId);

//   res.json({ message: "User unfollowed successfully" });
// };
