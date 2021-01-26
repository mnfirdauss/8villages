const db = require("../config/config");
const Joi = require("joi");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const User = db.get("users");

const registerSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        _id: id,
      });

      if (!user) return next();
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const value = await registerSchema.validateAsync(req.body);
      const user = await User.findOne({
        email: value.email,
      });

      if (user) {
        throw { message: "Email already exist", statusCode: 400 };
      }

      value.password = hashPassword(value.password);
      const inserted = await User.insert(value);
      res.json(inserted);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const value = await loginSchema.validateAsync(req.body);
      const user = await User.findOne({
        email: value.email,
      });

      if (!user) {
        throw { message: "Wrong email/password", statusCode: 400 };
      } else if (!comparePassword(value.password, user.password)) {
        throw { message: "Wrong email/password", statusCode: 400 };
      } else {
        const access_token = generateToken({ user });
        res.json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
