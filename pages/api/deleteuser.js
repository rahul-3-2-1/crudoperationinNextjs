import connectDB from "../../middleware/mongodb";

import User from "../../models/user";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const data = await User.findByIdAndDelete({ _id: id });

      res.status(200).json({ id: id });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
};
export default connectDB(handler);
