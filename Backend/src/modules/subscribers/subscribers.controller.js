import Subscribers from "./subscribers.model.js";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existing = await Subscribers.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Subscribers({ email });
    await newSubscriber.save();

    res.status(201).json({ message: " Successfully subscribed to the newsletter!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
