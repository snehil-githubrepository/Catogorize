import express from "express";
import session from "express-session";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

app.use(
  session({
    secret: "Cat02472xJ", // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true for HTTPS environments
      httpOnly: true, // Restrict access to cookies to HTTP requests only
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (e.g., 24 hours)
    },
  })
);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("welcome to home");
});

// Use the auth routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(
    "Server is Successfully Running, and App is listening on port " + PORT
  );
});
