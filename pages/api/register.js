import connectDB from "../../middleware/mongodb";

import User from "../../models/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, age, email, occupation } = req.body;

    try {
      const user = new User({
        name,
        age,
        email,
        occupation,
      });
      const data = await user.save();

      res.status(202).send(data);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
};
export default connectDB(handler);
