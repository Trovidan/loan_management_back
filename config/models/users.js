const mongoose = require("mongoose");
const type = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    primary_email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
    },
    power: {
      type: Number,
      default: 3,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
