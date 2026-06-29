const express = require("express");
const { getAllUsers } = require("../controllers/users/get.all.users"); 
const { addUser } = require("../controllers/users/add.new.user");
const { editUser } = require("../controllers/users/edit.user");

const router = express.Router();
const userRouting = require("../routes/users.routes");

router.get("/",getAllUsers);

router.put("/:userId",editUser)

router.post("/", addUser)

module.exports = router;