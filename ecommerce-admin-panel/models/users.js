import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  productPrice: {
    type: Number,
    require: true,
  },
});

export default User = mongoose.model("User", userSchema);
