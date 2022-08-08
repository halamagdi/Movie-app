const { StatusCodes } = require("http-status-codes");


const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../common/services/sendEmail");

const getAllUsers = async(req, res) => {
    // hangeb el model elly fy el model
    // if (req.user.role == "admin") {
    try {
        const { id } = req.params;
        let { search, page, size } = req.query;

        if (!page) {
            page = 1;


        }
        if (!size) {
            size = 10;
        }
        const limit = parseInt(size);
        const skip = (page - 1) * size; // skip b 3adad el posts
        if (id) {
            const data = await User.findOne({ _id: id });
            if (data) {
                res.json({ message: "data", data });
            } else {
                res.json({ message: "not found" });
            }
        } else if (search) {
            const data = await User.find({ firstName: { $regex: search } });
            res.json({ message: "data", data });
        } else {
            const data = await User.find({}).limit(limit).skip(skip);

            // console.log(data);
            res.json({ message: "data", data });
        }
    } catch (error) {
        res.json({ message: "error", error });
    }
    // } else {
    //   res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    // }
};

const addNewUsers = async(req, res) => {
    const { firstName, lastName, email, password, age } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "email is already exists" });
        } else {
            //   bcrypt.hash(password, 7, async function (err, hash) {
            //     if (err) throw Error(err);

            // }

            // console.log(info);

            const newUser = new User({
                firstName,
                lastName,
                email,
                password,
                age,
            });
            const data = await newUser.save();
            var token = jwt.sign({ _id: data._id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            const info = await sendEmail(
                process.env.SENDER,
                process.env.SENDER_PASSWORD, [email],
                "EMAIL VERFICIATION",
                `<h1> HELLO WORLD</h1>
        <a href="http://localhost:5000/verify/${token}" > Verify</a>
        `
            );
            // console.log(info);
            if (info.messageId) {
                console.log(info.messageId);
                res.status(StatusCodes.CREATED).json({ message: "success", data });
            } else {
                res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: "error" });
            }
        }
    } catch (error) {
        console.log(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error });
    }
};

const verifyHandeler = async(req, res) => {
    const { token } = req.params;
    console.log(token);
    var decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: decoded._id });
    if (user) {
        const updatedUser = await User.findOneAndUpdate({ _id: decoded._id }, {
            verified: true,
        });
        res.status(StatusCodes.OK).json({ message: "verified user", updatedUser });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" });
    }
};

const signInhandler = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "email not exist!" });
        } else {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ _id: user._id, email: user.email, role: user.role },
                    process.env.SECRET_KEY, {
                        expiresIn: "2h",
                    }
                );
                // const data = await User.findOne({ email }).select("-password");
                const { password, ...rest } = user._doc;
                res
                    .status(StatusCodes.OK)
                    .json({ message: "login success", token, data: rest });
            } else {
                res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: "password not correct !" });
            }
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error });
    }
};

// const getSingleUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.json({ message: "error", error });
//   }
// };

const deleteUsers = async(req, res) => {
    const { id } = req.params;
    try {
        let data = await User.deleteOne({ _id: id });
        if (data.deletedCount) {
            res.json({ message: "Deleted", data });
        } else {
            res.json({ message: "user doesn't exist!" });
        }
    } catch (error) {
        res.json({ message: "error", error });
    }
};

const updateUsers = async(req, res) => {
    const { id } = req.params;
    const { firstName } = req.body;
    try {
        let data = await User.updateOne({ _id: id }, {
            firstName,
        });
        if (data.modifiedCount) {
            res.json({ message: "updated", data });
        } else {
            res.json({ message: "user doesn't exist!" });
        }
    } catch (error) {
        res.json({ message: "error", error });
    }
};
module.exports = {
    getAllUsers,
    addNewUsers,
    deleteUsers,
    updateUsers,
    // getSingleUser,
    signInhandler,
    verifyHandeler,
};