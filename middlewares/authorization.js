const db = require("../config/config");
const { ObjectId } = require("mongodb");
const Questions = db.get("questions");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    const question = await Questions.findOne({
      _id: id,
    });

    if (!question) {
      throw { message: "Question not found", statusCode: 404 };
    } else if (`${question.author._id}` === `${req.loggedIn._id}`) {
      next();
    } else {
      throw { message: "Not Authorized", statusCode: 401 };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
