import connectDB from "../../middleware/mongodb";

import User from "../../models/user";

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    const { id, name, age, email, occupation } = req.body;

    try {
      const data = await User.findByIdAndUpdate(
        { _id: id },
        { name: name, age: age, email: email, occupation: occupation },
        { new: true }
      );

      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
};
export default connectDB(handler);
