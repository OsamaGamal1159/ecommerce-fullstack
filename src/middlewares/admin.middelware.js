

export const admin = (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, no user" });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
