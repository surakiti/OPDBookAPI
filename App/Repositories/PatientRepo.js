const { contract, defaultAccount } = require('../Lib/Web3')
const { convertString, bindData, unlockAccount, lockAccount, convertToAscii } = require('../Services/Utils')
const { requestOTP, validateOTP, cancelOTP, sendVerifyEmail } = require("./AuthenticationRepo")
const { patientScheme } = require("../Models/PatientModel")
const moment = require("moment");

const login = async (citizenId, password) => {
    const res = await contract.Login(convertString(citizenId), convertString(password));
    if (res) { return { status: true, message: "SUCCESS" } }
    return { status: false, message: "ERROR : Incorrect citizen Id or password" };
}

const get = citizenId => {
    const byteCitizenId = convertString(citizenId)
    const info1 = contract.getInfoPatientPart1(byteCitizenId, defaultAccount)
    const info2 = contract.getInfoPatientPart2(byteCitizenId, defaultAccount)
    const info3 = contract.getInfoPatientPart3(byteCitizenId, defaultAccount)
    const info4 = contract.getInfoPatientPart4(byteCitizenId, defaultAccount)
    const combindedInfoData = bindData(patientScheme, [info1, info2, info3, info4], 'info')

    const addressPatient = contract.getAddressPatient(byteCitizenId, defaultAccount)
    const combindedAddressData = bindData(patientScheme, [addressPatient], 'address')

    const allergyPatient = contract.getPatientAllergy(byteCitizenId, defaultAccount);
    const combindedAllergyData = bindData(patientScheme, [allergyPatient], 'allery')

    const emer1 = contract.getEmergencyContactPart1(byteCitizenId, defaultAccount);
    const emer2 = contract.getEmergencyContactPart2(byteCitizenId, defaultAccount);
    const combindedEmerData = bindData(patientScheme, [emer1, emer2], 'emerContact')

    const patientParent = contract.getPatientParent(byteCitizenId, defaultAccount);
    const combindedParentData = bindData(patientScheme, [patientParent], 'parent')

    let patient = { ...combindedInfoData, ...combindedAddressData, ...combindedAllergyData, ...combindedEmerData, ...combindedParentData }
    return { status: true, message: "SUCCESS", data: patient }
}

const getBasicData = citizenId => {
    const byteCitizenId = convertString(citizenId)
    const info1 = contract.getInfoPatientPart1(byteCitizenId, defaultAccount)
    const info2 = contract.getInfoPatientPart2(byteCitizenId, defaultAccount)
    const info3 = contract.getInfoPatientPart3(byteCitizenId, defaultAccount)
    const info4 = contract.getInfoPatientPart4(byteCitizenId, defaultAccount)
    const combindedInfoData = bindData(patientScheme, [info1, info2, info3, info4], 'info')

    const allergyPatient = contract.getPatientAllergy(byteCitizenId, defaultAccount);
    const combindedAllergyData = bindData(patientScheme, [allergyPatient], 'allery')

    let patient = { ...combindedInfoData, ...combindedAllergyData }
    return { status: true, message: "SUCCESS", data: patient }
}

const insert = async (patient) => {
    if (unlockAccount()) {
        console.log("insert")
        let arrTx = []
        arrTx.push(await contract.setInfoPatientPart1(convertString(patient.citizenId), convertString(moment().format("L")), convertString(patient.password), defaultAccount))
        // arrTx.push(infoPart1)
        arrTx.push(await contract.setInfoPatientPart2(convertString(patient.citizenId), convertString(patient.dob), convertString(patient.nametitle), convertString(patient.firstname), convertString(patient.lastname), convertString(patient.gender), defaultAccount))
        arrTx.push(await contract.setInfoPatientPart3(convertString(patient.citizenId), convertString(patient.congenitalDisease), convertString(patient.bloodgroup), convertString(patient.religion), convertString(patient.nationality), convertString(patient.country), defaultAccount))
        arrTx.push(await contract.setInfoPatientPart4(
            convertString(patient.citizenId),
            convertString(patient.status),
            convertString(!patient.occupartion ? "-" : patient.occupartion),
            convertString(!patient.homePhonenumber ? "-" : patient.homePhonenumber),
            convertString(patient.mobileNumber),
            convertString(patient.email),
            defaultAccount))
        // contract.setEmail(convertString(patient.email), defaultAccount);
        arrTx.push(await contract.setAddressPatient(convertString(patient.citizenId), convertString(patient.typeofHouse), convertString(patient.address), convertString(patient.province), convertString(patient.district), convertString(patient.subDistrict), convertString(patient.zipcode), defaultAccount))
        arrTx.push(await contract.setPatientAllergy(convertString(patient.citizenId), convertString(patient.allergy), convertString(patient.privilege), defaultAccount))
        // arrTx.push(await contract.setVerifyEmail(convertString(patient.citizenId),false))
        if (patient.emerTitle || patient.emerFirstname || patient.emerLastname) {
            // console.log("มี emer")
            arrTx.push(await contract.setEmergencyContactPart1(
                convertString(patient.citizenId),
                convertString(patient.emerTitle),
                convertString(patient.emerFirstname),
                convertString(patient.emerLastname),
                convertString(patient.emerRelationship),
                convertString(!patient.emerHomePhonenumber ? "-" : patient.emerHomePhonenumber),
                convertString(patient.emerMobileNumber),
                defaultAccount))
            arrTx.push(await contract.setEmergencyContactPart2(
                convertString(patient.citizenId),
                convertString(patient.typeofHouse),
                convertString(patient.address),
                convertString(patient.province),
                convertString(patient.district),
                convertString(patient.subDistrict),
                convertString(patient.zipcode),
                defaultAccount))
        }

        if ((patient.fatherFirstname && patient.fatherLastname) || (patient.motherFirstname && patient.motherLastname)) {
            // console.log("มี พ่อแม่")
            arrTx.push(await contract.setPatientParent(
                convertString(patient.citizenId),
                convertString(!patient.fatherFirstname ? "-" : patient.fatherFirstname),
                convertString(!patient.fatherLastname ? "-" : patient.fatherLastname),
                convertString(!patient.motherFirstname ? "-" : patient.motherFirstname),
                convertString(!patient.motherLastname ? "-" : patient.motherLastname), defaultAccount))
        }
        // console.log("Success")
        lockAccount()

        // await sendVerifyEmail(patient)
        console.log("arrTx",arrTx)
        
        if (arrTx.length>5){
            // required field 6 transaction
            return { status: true, message: "SUCCESS", data: { transaction : arrTx } };
        }
    } else {
        return { status: false, message: "ERROR"};
    }
}

const isPatient = citizenId => {
    console.log(citizenId)
    const byteCitizenId = convertString(citizenId)
    console.log(byteCitizenId)
    return contract.haveCitizenId(byteCitizenId);
}

const isEmail = (email) => {
    console.log("email", email)
    const byteEmail = convertString(email)
    return contract.haveEmail(byteEmail)
}

const edit = async (data) => {
    console.log("edit", data)
    let arrTx = [];
    if (unlockAccount()) {
        if (data.editInfoPart1) {
            arrTx.push(await contract.setInfoPatientPart1(convertString(data.citizenId), convertString(moment().format("L")), convertString(data.password), defaultAccount))
        }
        if (data.editInfoPart2) {
            arrTx.push(await contract.setInfoPatientPart2(convertString(data.citizenId), convertString(data.dob), convertString(data.nametitle), convertString(data.firstname), convertString(data.lastname), convertString(data.gender), defaultAccount))
        }
        if (data.editInfoPart3) {
            arrTx.push(await contract.setInfoPatientPart3(convertString(data.citizenId), convertString(data.congenitalDisease), convertString(data.bloodgroup), convertString(data.religion), convertString(data.nationality), convertString(data.country), defaultAccount))
        }
        if (data.editInfoPart4) {
            arrTx.push(await contract.setInfoPatientPart4(
                convertString(data.citizenId),
                convertString(data.status),
                convertString(!data.occupartion ? "-" : data.occupartion),
                convertString(!data.homePhonenumber ? "-" : data.homePhonenumber),
                convertString(data.mobileNumber),
                convertString(data.email),
                defaultAccount))
        }
        if (data.editEmail) {
            console.log("EDIT EMAIL!!")
            arrTx.push(await contract.setEmail(convertString(data.email),convertString(data.newEmail), defaultAccount))
            arrTx.push(await contract.setInfoPatientPart4(
                convertString(data.citizenId),
                convertString(data.status),
                convertString(!data.occupartion ? "-" : data.occupartion),
                convertString(!data.homePhonenumber ? "-" : data.homePhonenumber),
                convertString(data.mobileNumber),
                convertString(data.newEmail),
                defaultAccount))
        }
        if (data.editAddress) {
            arrTx.push(await contract.setAddressPatient(convertString(data.citizenId), convertString(data.typeofHouse), data.address, convertString(data.province), convertString(data.district), convertString(data.subDistrict), convertString(data.zipcode), defaultAccount))
        }
        if (data.editAllergy) {
            arrTx.push(await contract.setPatientAllergy(convertString(data.citizenId), convertString(data.allergy), convertString(data.privilege), defaultAccount))
        }

        if (data.editEmerContact1) {
            arrTx.push(await contract.setEmergencyContactPart1(
                convertString(data.citizenId),
                convertString(data.emerTitle),
                convertString(data.emerFirstname),
                convertString(data.emerLastname),
                convertString(data.emerRelationship),
                convertString(!data.emerHomePhonenumber ? "-" : data.emerHomePhonenumber),
                convertString(data.emerMobileNumber),
                defaultAccount))
        }
        if (data.editEmerContact2) {
            arrTx.push(await contract.setEmergencyContactPart2(
                convertString(data.citizenId),
                convertString(data.typeofHouse),
                convertString(data.address),
                convertString(data.province),
                convertString(data.district),
                convertString(data.subDistrict),
                convertString(data.zipcode),
                defaultAccount))
        }

        if (data.editParent) {
            arrTx.push(await contract.setPatientParent(
                convertString(data.citizenId),
                convertString(!data.fatherFirstname ? "-" : data.fatherFirstname),
                convertString(!data.fatherLastname ? "-" : data.fatherLastname),
                convertString(!data.motherFirstname ? "-" : data.motherFirstname),
                convertString(!data.motherLastname ? "-" : data.motherLastname), defaultAccount))
        }
        lockAccount()

        if (arrTx.length > 0) {
            // required field 6 transaction
            return { status: true, message: "SUCCESS", data: { transaction: arrTx } };
        }

        // let check = false
        // while (check === false) {
        //     check = await isPatient(data.citizenId);
        //     if (check) {
        //         return { status: true, message: "SUCCESS" };
        //     }
        // }
    } else {
        return { status: false, message: "ERROR" };
    }
}

const checkPassword = (citizenId, password) => {
    console.log("checkPassword",citizenId, password)
    const byteCitizenId = convertString(citizenId)
    const bytePassword = convertString(password)
    return contract.checkPassword(byteCitizenId, bytePassword)
}

const verifiedByCitizenId = async (citizenId) => {
    const byteCitizenId = convertString(citizenId)
    const byteMobileNumber = contract.getMobileNumber(byteCitizenId)
    let stringMobileNumber = convertToAscii(byteMobileNumber);
    return requestOTPwithMobile(stringMobileNumber)

    // let mobileNumber = "66" + stringMobileNumber.substring(1)
    // console.log(mobileNumber)
    // let hideNumber = stringMobileNumber.substring(0, 3) + "-xxx-xx" + stringMobileNumber.substring(stringMobileNumber.length - 2)
    // try {
    //     const res = await requestOTP(mobileNumber)
    //     console.log("verifiedByCitizenId", res)
    //     return ({ status: true, message: "SUCCESS", data: { requestId: res.requestId, mobileNumber: hideNumber } });
    // } catch (err) {
    //     return ({ status: false, statusCode: err.message.status, message: err.message.error_text, data: { requestId: err.requestId } });
    // }
}

const getPatientWithOTP = async (data) => {
    //validate
    console.log("getPatientWithOTP", data)
    try {
        await validateOTP(data.requestId, data.pin)
        const byteCitizenId = convertString(data.citizenId)
        const info1 = contract.getInfoPatientPart1(byteCitizenId, defaultAccount)
        const info2 = contract.getInfoPatientPart2(byteCitizenId, defaultAccount)
        const info3 = contract.getInfoPatientPart3(byteCitizenId, defaultAccount)
        const info4 = contract.getInfoPatientPart4(byteCitizenId, defaultAccount)
        const combindedInfoData = bindData(patientScheme, [info1, info2, info3, info4], 'info')

        const addressPatient = contract.getAddressPatient(byteCitizenId, defaultAccount)
        const combindedAddressData = bindData(patientScheme, [addressPatient], 'address')

        const allergyPatient = contract.getPatientAllergy(byteCitizenId, defaultAccount);
        const combindedAllergyData = bindData(patientScheme, [allergyPatient], 'allery')

        const emer1 = contract.getEmergencyContactPart1(byteCitizenId, defaultAccount);
        const emer2 = contract.getEmergencyContactPart2(byteCitizenId, defaultAccount);
        const combindedEmerData = bindData(patientScheme, [emer1, emer2], 'emerContact')

        const patientParent = contract.getPatientParent(byteCitizenId, defaultAccount);
        const combindedParentData = bindData(patientScheme, [patientParent], 'parent')

        let patient = { ...combindedInfoData, ...combindedAddressData, ...combindedAllergyData, ...combindedEmerData, ...combindedParentData }
        return ({ status: true, message: "SUCCESS", data: patient })
    } catch (err) {
        return ({ status: false, statusCode: err.message.status, message: err.message.error_text, data: { requestId: err.requestId } });
    }
}

const cancelRequestOTP = async (requestId) => {
    try {
        const res = await cancelOTP(requestId)
        return ({ status: true, message: "SUCCESS" });
    } catch (err) {
        return ({ status: false, statusCode: err.message.status, message: err.message.error_text });
    }
}

const forgotPasswordVerify = async (citizenId, dob) => {
    const byteCitizenId = convertString(citizenId)
    const byteDob = convertString(dob)
    console.log("forgotPasswordVerify",citizenId, dob) 
    return contract.forgotPasswordVerify(byteCitizenId, byteDob);
}

const confirmChangePassword = async (citizenId, newPassword, oldPassword=null ) => {
    console.log("confirmChangePassword")
    const byteCitizenId = convertString(citizenId)
    const bytePassword = convertString(newPassword)
    let arrTx = []
    if(oldPassword){
        console.log("oldPassword // เปลี่ยนรหัสผ่าน")
        if (checkPassword(citizenId, oldPassword)) {
            // กรณีรู้รหัสเก่า >> เปลี่ยน pass
            if (!checkPassword(citizenId, newPassword)) {
                // เชคว่า รหัสใหม่ ตรงกับในระบบไหม >> ถ้าไม่ตรงถึงเปลี่ยนรหัสได้
                if (unlockAccount()) {
                    arrTx.push(await contract.setPassword(byteCitizenId, bytePassword))
                    lockAccount()
                }
                if(arrTx.length>0){
                    return { status: true, message: "SUCCESS", data: { transaction: arrTx } };
                }
                // let check = false
                // while (check === false) {
                //     check = await checkPassword(citizenId, newPassword);
                //     if (check) {
                //         return { status: true, message: "SUCCESS" };
                //     }
                // }
            } else {
                return { status: false, message: "Password must differ from old password!" };
            }
        }
        return { status: false, message: "Your password was incorrect. Please re-enter your password" };
    }else{
        // กรณีลืมรหัสผ่าน
        if (!checkPassword(citizenId, newPassword)) {
            // เชคว่า รหัสใหม่ ตรงกับในระบบไหม >> ถ้าไม่ตรงถึงเปลี่ยนรหัสได้
            if (unlockAccount()) {
                arrTx.push(await contract.setPassword(byteCitizenId, bytePassword))
                lockAccount()
            }
            if (arrTx.length > 0) {
                return { status: true, message: "SUCCESS", data: { transaction: arrTx } };
            }

            // let check = false
            // while (check === false) {
            //     check = await checkPassword(citizenId, newPassword);
            //     if (check) {
            //         return { status: true, message: "SUCCESS" };
            //     }
            // }
        } else {
            return { status: false, message: "Password must differ from old password!" };
        }
    }
}

requestOTPwithMobile = async (mobileNumber) => {
    let mobileNumberConvert = "66" + mobileNumber.substring(1)
    // let mobileNumberConvert = mobileNumber
    let hideNumber = mobileNumber.substring(0, 3) + "-xxx-xx" + mobileNumber.substring(mobileNumber.length - 2)
    try {
        const res = await requestOTP(mobileNumberConvert)
        return ({ status: true, message: "SUCCESS", data: { requestId: res.requestId, mobileNumber: hideNumber } });
    } catch (err) {
        if (err.message.status == '10'){
            let result = await cancelRequestOTP(err.requestId)
            if(result.status){
                try {
                    const res = await requestOTP(mobileNumberConvert)
                    return ({ status: true, message: "SUCCESS", data: { requestId: res.requestId, mobileNumber: hideNumber } });
                } catch (err) {
                    return ({ status: false, statusCode: err.message.status, message: err.message.error_text, data: { requestId: err.requestId } });
                }
            }else{
                return result
            }
        }
        return ({ status: false, statusCode: err.message.status, message: err.message.error_text, data: { requestId: err.requestId } });
    }
}

validateOTPvalue = async (requestId, pin) => {
    try{
        const res = await validateOTP(requestId, pin)
        return { status: true, message: "SUCCESS" };
    }catch(err){
        return ({ status: false, statusCode: err.message.status, message: err.message.error_text, data: { requestId: err.requestId } });
    }
}

module.exports = {
    isPatient,
    login,
    isEmail,
    get,
    insert,
    getBasicData,

    edit,
    checkPassword,
    // requestOTP,
    validateOTPvalue,
    getPatientWithOTP,
    verifiedByCitizenId,
    cancelRequestOTP,

    forgotPasswordVerify,
    confirmChangePassword,
    requestOTPwithMobile
};