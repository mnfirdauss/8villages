const router = require("express").Router();
const UserRouter = require("./User");
const QuestionRouter = require("./Questions");
const Authentication = require("../middlewares/authentication");

router.use(UserRouter);
router.use(Authentication);
router.use(QuestionRouter);

module.exports = router;
