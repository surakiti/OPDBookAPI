const Router = require('express').Router
const router = Router()

const route = require("./Routes");

router.use("/", route)
module.exports = router