const express = require("express");

const { loggerMiddleWare } = require("../middlewares/loggerMiddleWare");
const { generateMessage, sendMessage } = require("../controllers/mailController");

const router = express.Router();
router.use(loggerMiddleWare);

router.post("/generate", generateMessage);
router.post("/send", sendMessage);

module.exports = router;
