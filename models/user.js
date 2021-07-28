import mongoose from "mongoose";
let Schema = mongoose.Schema;

let user = new Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  email: {
    type: String,
  },
  occupation: {
    type: String,
  },
});

mongoose.models = {};
let User = mongoose.model("User", user);

export default User;
