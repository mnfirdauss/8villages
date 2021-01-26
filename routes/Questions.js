const router = require("express").Router();
const QuestionController = require("../controllers/Questions");
const authorization = require("../middlewares/authorization");

router.get("/questions", QuestionController.getAll);
router.get("/questions/:id", QuestionController.getOne);
router.post("/questions", QuestionController.create);
router.put("/questions/:id", authorization, QuestionController.update);
router.delete(
  "/questions/:id",
  authorization,
  QuestionController.deleteQuestion
);

module.exports = router;
