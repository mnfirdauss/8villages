const { verifyToken } = require("../helpers/jwt");
const db = require("../config/config");
const User = db.get("users");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { message: "Authentication Failed", statusCode: 401 };
    } else {
      const decoded = verifyToken(access_token);
      const user = await User.findOne({
        _id: decoded.user._id,
      });

      if (!user) {
        throw { message: "Authentication Failed", statusCode: 401 };
      } else {
        req.loggedIn = {
          _id: user._id,
          name: user.name,
        };
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
