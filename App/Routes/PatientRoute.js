const router = require("express").Router();

const { insertCtr, getCtr, isCitizenIdCtr, isEmailCtr, getBasicDataCtr, editCtr, checkPasswordCtr, getPatientWithOTPCtr, requestOTPCtr,
    cancelRequestOTPCtr, forgotPasswordVerifyCtr, confirmChangePasswordCtr, validateOTPCtr} = require("../Controllers/PatientController")

router.post("/insert", insertCtr);
router.post("/get", getCtr);
router.post("/getBasicData", getBasicDataCtr);
router.post("/isCitizenId", isCitizenIdCtr);
router.post("/isEmail", isEmailCtr);
router.post("/edit", editCtr);
router.post("/checkPassword", checkPasswordCtr);
// router.post("/requestOTP", requestOTPCtr);
router.post("/validateOTP", validateOTPCtr);
router.post("/getPatientWithOTP", getPatientWithOTPCtr);
router.post("/requestOTP", requestOTPCtr);
router.post("/cancelRequestOTP", cancelRequestOTPCtr);

router.post("/forgotPasswordVerify", forgotPasswordVerifyCtr);
router.post("/confirmChangePassword", confirmChangePasswordCtr);

module.exports = router;
