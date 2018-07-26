const express = require("express");

const authMW = require("../middlewares/auth");

const {
  requests_get_all,
  requests_create_one
} = require("../controllers/requestControllers");

const router = express.Router();

router.get("/", authMW, requests_get_all);
router.post("/submit", authMW, requests_create_one);

module.exports = router;
