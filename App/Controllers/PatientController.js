const { isPatient, isEmail, insert, get, getBasicData, edit, checkPassword, getPatientWithOTP, verifiedByCitizenId, cancelRequestOTP,
    forgotPasswordVerify, confirmChangePassword, validateOTPvalue, requestOTPwithMobile } = require("../Repositories/PatientRepo")
const msg = require("../Services/Message")

const insertCtr = async (req, res) => {
    if (!isPatient(req.body.citizenId)) {
        if (!isEmail(req.body.email)) {
            try {
                const result = await insert(req.body)
                res.send(result)
                return;
            } catch (error) {
                res.send(msg.getMsgError(error))
                return;
            }
        }
        res.send(msg.getMsgDuplicate(msg.msgVariable.email));
        return;
    }
    res.send(msg.getMsgDuplicate(msg.msgVariable.citizenID));
}

const getCtr = (req, res) => {
    if (isPatient(req.body.citizenId)) {
        const result = get(req.body.citizenId)
        res.send(result)
        return;
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const getBasicDataCtr = (req, res) => {
    if (isPatient(req.body.citizenId)) {
        const result = getBasicData(req.body.citizenId)
        res.send(result)
        return;
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const isCitizenIdCtr = (req, res) => {
    res.send(isPatient(req.body.citizenId))
}

const isEmailCtr = (req, res) => {
    res.send(isEmail(req.body.email))
}

const editCtr = async (req, res) => {
    if (isPatient(req.body.citizenId)) {
        const result = await edit(req.body)
        console.log(result)
        res.send(result)
        return;
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const checkPasswordCtr = (req, res) => {
    console.log("checkPasswordCtr")
    res.send(checkPassword(req.body.citizenId,req.body.password))
}

const requestOTPCtr = async (req, res) => {
    console.log('requestOTPCtr', req.body)
    if (isPatient(req.body.citizenId)) {
        if (req.body.requestId){
            const statusCancel = await cancelRequestOTP(req.body.requestId)
            if (!statusCancel.status){
                res.send(statusCancel)
                return
            }
        }
        if(req.body.mobileNumber) {
            console.log('mobileNumber', req.body.mobileNumber)
            const requestOTP = await requestOTPwithMobile(req.body.mobileNumber)
            if (requestOTP) {
                res.send(requestOTP)
                return
            }
        }
        const result = await verifiedByCitizenId(req.body.citizenId)
        res.send(result)
        return;
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const getPatientWithOTPCtr = async (req, res) => {
    if (isPatient(req.body.citizenId)) {
        const result = await getPatientWithOTP(req.body)
        res.send(result)
        return;
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const cancelRequestOTPCtr = async (req, res) => {
    const result = await cancelRequestOTP(req.body.requestId)
    res.send(result)
}

const forgotPasswordVerifyCtr = async (req, res) => {
    if (isPatient(req.body.citizenId)) {
        try {
            const result = await forgotPasswordVerify(req.body.citizenId, req.body.dob)
            if(result){
                res.send(msg.getMsgSuccess())
            }else{
                res.send(msg.getMsgNotMatch(msg.msgVariable.citizenID,msg.msgVariable.dob))
            }
            return
        } catch (error) {
            res.send(msg.getMsgError(error))
            return;
        }
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const confirmChangePasswordCtr = async (req, res) => {
    console.log("confirmChangePasswordCtr", req.body.newPassword ,req.body.newPasswordConfirm)
    if (req.body.newPassword === req.body.newPasswordConfirm){
        if (isPatient(req.body.citizenId)) {
            try {
                const result = await confirmChangePassword(req.body.citizenId, req.body.newPassword, req.body.oldPassword)
                res.send(result)
                return
            } catch (error) {
                res.send(msg.getMsgError(error))
                return;
            }
        }
        res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
    }
    res.send(msg.getMsgError("Those password didn't match. Try again."))
}

const validateOTPCtr = async (req, res)  => {
    const result = await validateOTPvalue(req.body.requestId,req.body.pin)
    res.send(result)
}


module.exports = {
    insertCtr,
    getCtr,
    isCitizenIdCtr,
    isEmailCtr,
    getBasicDataCtr,
    editCtr,
    checkPasswordCtr,
    // requestOTPCtr,
    validateOTPCtr,
    getPatientWithOTPCtr,
    requestOTPCtr,
    cancelRequestOTPCtr,

    forgotPasswordVerifyCtr,
    confirmChangePasswordCtr

};
