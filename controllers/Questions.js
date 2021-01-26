const db = require("../config/config");
const Joi = require("joi");
const Questions = db.get("questions");

const questionSchema = Joi.object({
  question: Joi.string().trim().required(),
  created_at: Joi.date().required(),
  author: Joi.object({
    _id: Joi.object(),
    name: Joi.string(),
  }),
});

class QuestionController {
  static async getAll(req, res, next) {
    try {
      let { page, limit } = req.query;

      if (!page) {
        page = 1;
        limit = 5;
      }

      const skip = (page - 1) * limit;
      const questions = await Questions.find(
        {},
        { skip: +skip, limit: +limit }
      );
      res.json(questions);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const question = await Questions.findOne({
        _id: id,
      });
      res.json(question);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { question } = req.body;
      const payload = {
        question,
        created_at: new Date(),
        author: req.loggedIn,
      };
      const value = await questionSchema.validateAsync(payload);
      const inserted = await Questions.insert(value);
      res.json(inserted);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const question = await questionSchema.validateAsync(req.body);
      await Questions.update(
        {
          _id: id,
        },
        {
          $set: question,
        }
      );
      res.json(question);
    } catch (err) {
      next(err);
    }
  }

  static async deleteQuestion(req, res, next) {
    try {
      const { id } = req.params;

      await Questions.remove({
        _id: id,
      });
      res.json({ message: "Delete Success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuestionController;
