import connectDB from "../../middleware/mongodb";

import User from "../../models/user";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log("rahul");

    try {
      const data = await User.find();

      return res.status(202).json({ data: data });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
};
export default connectDB(handler);
