const router = require("express").Router();
const UserController = require("../controllers/User");

router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getOne);
router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.post("/users/logout");

module.exports = router;
