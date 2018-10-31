const router = require("express").Router();

const { setMRForNurseCtr, setMRForDoctorCtr, getMRForNurseCtr, getMRForDoctorCtr, 
    getMedicalRecordCtr, getHistoryMedicalRecordCtr, getMRForPharmacyCtr, } = require("../Controllers/MedicalRecordController")

router.post("/setMedicalRecordForNurse", setMRForNurseCtr);
router.post("/setMedicalRecordForDoctor", setMRForDoctorCtr);
router.post("/getMedicalRecordForNurse", getMRForNurseCtr);
router.post("/getMedicalRecordForDoctor", getMRForDoctorCtr);
router.post("/getMedicalRecordForPharmacy", getMRForPharmacyCtr);
router.post("/getMedicalRecord", getMedicalRecordCtr);
router.post("/getHistoryMedicalRecord", getHistoryMedicalRecordCtr);


module.exports = router;
