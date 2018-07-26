const express = require("express");

const authMW = require("../middlewares/auth");
const validMW = require("../middlewares/validator");

const {
  books_get_all,
  books_create_one,
  books_remove_one,
  books_update_one
} = require("../controllers/bookControllers");

const router = express.Router();

router.get("/", books_get_all);

router.post("/insert", validMW, authMW, books_create_one);
router.delete("/remove", authMW, books_remove_one);
router.patch("/modify/:bookId", validMW, authMW, books_update_one);
module.exports = router;
