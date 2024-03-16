import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import session, { SessionData } from "express-session";

const prisma = new PrismaClient();

// Define a custom interface that extends SessionData to include the 'user' property
interface CustomSessionData extends SessionData {
  user?: {
    id: number; // User ID
    username: string; // Username
  };
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    // Set session data for the newly registered user
    (req.session as CustomSessionData).user = {
      id: newUser.id,
      username: newUser.username,
    };

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// post login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if there is a session token present in the user's browser cookie
    const sessionToken = req.cookies["session-token"];

    if (sessionToken) {
      // Validate the session token and retrieve the associated session data
      //   const sessionData = await validateSession(sessionToken);
      //   if (sessionData) {
      //     // Session token is valid, log the user in directly
      //     return res.json({
      //       message: "Login successful",
      //       user: sessionData.user,
      //     });
      //   }
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // If user not found or password doesn't match, return error
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Set session data for the authenticated user
    // const newSessionToken = await createSessionToken(user);

    // // Set the new session token in the user's browser cookie
    // res.cookie("session-token", newSessionToken, {
    //   maxAge: 24 * 60 * 60 * 1000,
    // }); // Adjust maxAge as needed

    // If user is found and password matches, login successful
    res.json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear any session-related data
    // For example, if using JWT tokens, you might clear the token from the client-side storage

    // Respond with a success message
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to validate session token and retrieve session data
// const validateSession = async (
//   sessionToken: string
// ): Promise<CustomSessionData | null> => {
//   // Implement session token validation logic here (e.g., verify JWT, check database, etc.)
//   // Return session data if token is valid, or null if token is invalid or expired
// };

// Function to create a new session token for the user
// const createSessionToken = async (user: User): Promise<string> => {
// Implement session token creation logic here (e.g., generate JWT, generate random token, etc.)
// Return the new session token
// };
