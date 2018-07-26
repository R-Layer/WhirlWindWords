const express = require("express");

const authMW = require("../middlewares/auth");

const {
  requests_get_all,
  requests_create_one,
  requests_delete_one,
  requests_update_one
} = require("../controllers/requestControllers");

const router = express.Router();

router.get("/", requests_get_all);
router.post("/submit", authMW, requests_create_one);
router.delete("/reject", authMW, requests_delete_one);
router.patch("/accept", authMW, requests_update_one);

module.exports = router;
