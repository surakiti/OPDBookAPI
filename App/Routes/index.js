const Router = require('express').Router

const router = Router()

const auth = require("./AuthenRoute");
const patient = require("./PatientRoute");
const mdr = require("./MedicalRecordRoute");

router.use("/auth", auth)
router.use("/patients", patient)
router.use("/medicalRecords", mdr)

module.exports = router