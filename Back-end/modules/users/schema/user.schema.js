const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    verified: { type: Boolean, default: false },
    age: { type: Number, min: [10, "invalid age"] },
    
  },
  {
    timestamps: true,
  }
);

//hooks
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

userSchema.pre("find", function () {
  console.log("pre find all users : ", new Date());
});
// userSchema.post("find", function (result) {
//   console.log(result);
//   console.log("post find all users : ", new Date());
// });

module.exports = userSchema;
