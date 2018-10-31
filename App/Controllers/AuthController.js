const { isPatient, login } = require("../Repositories/PatientRepo")
const { sendEmail, sendVerifyEmail, } = require("../Repositories/AuthenticationRepo")
const msg = require("../Services/Message")

const loginCtr = async (req, res) => {
    if (isPatient(req.body.citizenId)) {
        const result = await login(req.body.citizenId, req.body.password)
        res.send(result)
        return;
    }
    res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const sendEmailCtr = async (req, res) => {
    // if (isPatient(req.body.citizenId)) {
    const result = await sendEmail(req.body)
    res.send(result)
    return;
    // }
    // res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}

const sendVerifyEmailCtr = async (req, res) => {
try {
    const result = await sendVerifyEmail(req.body)
    console.log("sendVerifyEmailCtr",result)
    res.send(result)
    return;
} catch (error) {
    res.send(msg.getMsgError(error.message))
    return;
}   
    // }
    // res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
}


// const verifyEmailCtr = async (req, res) => {
//     // if (isPatient(req.body.citizenId)) {
//     if (req.body.hashCode){
//         const result = await verifiedEmail(req.body.hashCode)
//         res.send(result)
//         return;
//     }
//     // }
//     // res.send(msg.getMsgNotFound(msg.msgVariable.citizenID));
// }

module.exports = {
    loginCtr,
    sendEmailCtr,
    sendVerifyEmailCtr
};