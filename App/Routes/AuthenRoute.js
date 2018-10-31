const router = require("express").Router();

const { loginCtr, sendEmailCtr, sendVerifyEmailCtr } = require("../Controllers/AuthController")

router.post("/login", loginCtr);
router.post("/sendEmail", sendEmailCtr)
router.post("/sendVerifyEmail", sendVerifyEmailCtr )


module.exports = router;