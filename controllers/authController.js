const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  userRegister = async (req, res) => {
    let { name, email, password } = req.body;
    email = email.trim();
    name = name.trim();
    password = password.trim();

    try {
      const getUser = await User.findOne({
        email,
      }).select("+password");
      if (getUser)
        return res.status(404).json({ message: "Email already existed." });
      else {
        const user = await User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
        });
        const token = await jwt.sign(
          {
            name,
            email,
            _id: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
        );
        return res
          .status(201)
          .json({ message: "Sign up user successfully.", token });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error.", token });
    }
  };

  userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select("+password");
      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          const token = jwt.sign(
            {
              email,
              name: user.name,
              _id: user.id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "2d",
            },
          );
          return res
            .status(200)
            .json({ message: "User sign in successfully.", token });
        } else {
          return res.status(404).json({ message: "Incorrect password." });
        }
      } else {
        return res.status(404).json({ message: "Email does not exist." });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  };

  getUserById = async (req, res) => {
    const { _id } = req.userInfo;
    try {
      const user = await User.findById(_id);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new AuthController();
