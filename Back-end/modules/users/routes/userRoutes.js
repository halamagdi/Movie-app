const {
  getAllUsers,
  addNewUsers,
  deleteUsers,
  updateUsers,
  signInhandler,
  verifyHandeler,

  // getSingleUser,
} = require("../controller/userController");
// var cors = require("cors");

const router = require("express").Router();
const validateRequest = require("../../../common/middleware/validateRequest");
// const isAuthorized = require("../../../common/middleware/isAuthorized");
const { addUserSchema, signInUserSchema } = require("../joi/userValidate");


router.get("/user", getAllUsers);
router.post("/signUp",  validateRequest(addUserSchema), addNewUsers);
router.post("/signIn", validateRequest(signInUserSchema), signInhandler);
router.delete("/user/:id", deleteUsers);
router.put("/user/:id", updateUsers);
router.get("/user/:id", getAllUsers);
router.get("/verify/:token", verifyHandeler);

module.exports = router;
