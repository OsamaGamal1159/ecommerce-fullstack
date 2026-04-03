import User from "./user.model.js";
import jwt from "jsonwebtoken";

export const createUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already exists");

  const user = await User.create({ name, email, password });
  return generateToken(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  return generateToken(user);
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};
