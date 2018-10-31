const { web3, contract, defaultAccount } = require('../Lib/Web3')
const { convertString, convertToAscii, bindData, unlockAccount, lockAccount } = require('../Services/Utils')
const moment = require("moment");
const { medicalRecordScheme } = require("../Models/MedicalRecordModel")
const { patientScheme } = require("../Models/PatientModel")
const { sendEmail } = require("./AuthenticationRepo")
const msg = require("../Services/Message")

const notRequiredField = (value) => {
    if (value) {
        return value;
    }
    return "-"
}

const setMedicalRecordForNurse = async (medicalRecord) => {
    // let medicalRecordId = (+contract.getLengthMedicalRecords() + 1) + "";
    let arrTx = []
    let key = convertString(medicalRecord.patientCitizenId + "" + medicalRecord.date+""+medicalRecord.time)
    if (unlockAccount()) {
        arrTx.push(await contract.setMedicalRecordForNursePart1(
            convertString(medicalRecord.patientCitizenId),
            key,
            convertString(medicalRecord.clinic),
            convertString(medicalRecord.height),
            convertString(medicalRecord.bodyWeight),
            convertString(medicalRecord.bmi),
            convertString(medicalRecord.temperature),
            convertString(medicalRecord.date),
            convertString(medicalRecord.time),
            medicalRecord.treatmentYear,
            defaultAccount
        ))
        let medicalRecordId = await contract.getMedicalRecordId(key).toString()
        // console.log("medicalRecordId",medicalRecordId)
        arrTx.push(await contract.setMedicalRecordForNursePart2(
            medicalRecordId,
            convertString(medicalRecord.pulseRate),
            convertString(medicalRecord.respiratoryRate),
            convertString(notRequiredField(medicalRecord.BP1)),
            convertString(notRequiredField(medicalRecord.BP2)),
            convertString(notRequiredField(medicalRecord.BP3)),
            convertString(notRequiredField(medicalRecord.chiefComplaint)),
            convertString(notRequiredField(medicalRecord.nurseName)),
            defaultAccount
        ))
        // console.log("Success")
        lockAccount()

        if(arrTx.length>1){
            return { status: true, message: "SUCCESS", data: { medicalRecordId: medicalRecordId, transaction: arrTx  }};
        }

        // let check = false
        // while (check === false) {
        //     check = isMedicalRecord(medicalRecordId);
        //     if (check) {
        //         return { status: true, message: "SUCCESS", data: { medicalRecordId: medicalRecordId } };
        //     }
        // }
    } else {
        return { status: false, message: "ERROR" };
    }
}

const setMedicalRecordForDoctor = async medicalRecord => {
    // console.log("setMedicalRecordForDoctor")
    let arrTx = [];
    if (unlockAccount()) {
        arrTx.push(await contract.setMedicalRecordForDoctor(
            medicalRecord.medicalRecordId,
            convertString(medicalRecord.presentIllness),
            convertString(medicalRecord.physicalExem),
            convertString(medicalRecord.diagnosis),
            convertString(medicalRecord.treatment),
            convertString(medicalRecord.recommendation),
            convertString(notRequiredField(medicalRecord.appointment)),
            convertString(medicalRecord.doctorName),
            defaultAccount
        ))

        arrTx.push(await contract.addHistoryMedicalRecord(
            convertString(medicalRecord.patientCitizenId),
            medicalRecord.medicalRecordId,
            defaultAccount
        ))

        // send Email
        let patientNameAndEmail = contract.getPatientNameAndEmail(convertString(medicalRecord.patientCitizenId))
        const combindedData = bindData(patientScheme, [patientNameAndEmail], 'patientAndEmail')

        getMedicalRecordForNurse(medicalRecord.medicalRecordId).then(async (res) => {
            let tmp = { ...res.data, ...medicalRecord, ...combindedData }
            await sendEmail(tmp)
        })

        // console.log("Success")
        lockAccount()

        if(arrTx.length>1){
            return { status: true, message: "SUCCESS", data: { transaction: arrTx  } };
        }


        // let checkTxDoctor = false;
        // let checkTxAddHistory = false;
        // while (!checkTxDoctor || !checkTxAddHistory) {
        //     checkTxDoctor = alreadyMedicalRecord(medicalRecord.medicalRecordId)
        //     checkTxAddHistory = haveMDRinPatientHistory(
        //         medicalRecord.patientCitizenId,
        //         medicalRecord.medicalRecordId
        //     )
        //     if (checkTxDoctor && checkTxAddHistory) {
        //         return { status: true, message: "SUCCESS" };
        //     }
        // }
    } else {
        return { status: false, message: "ERROR" };
    }
};

const getMedicalRecordForNurse = async (medicalRecordId) => {
    // const byteMedicalRecordId = convertString(medicalRecordId)
    const nurse1 = await contract.getMedicalRecordForNursePart1(medicalRecordId);
    const nurse2 = await contract.getMedicalRecordForNursePart2(medicalRecordId);
    const mdrInfo = await contract.getMedicalRecordInfo(medicalRecordId);
    const combindedNurseData = bindData(medicalRecordScheme, [nurse1, nurse2], 'nurse')
    const combindedInfoData = bindData(medicalRecordScheme, [mdrInfo], 'info')
    let medicalRecord = { ...combindedNurseData, ...combindedInfoData}
    medicalRecord.medicalRecordId = medicalRecordId;

    console.log("getMedicalRecordForNurse", medicalRecord)
    return { status: true, message: "SUCCESS", data: medicalRecord };
};

const getMedicalRecordForDoctor = async (medicalRecordId) => {
    // const byteMedicalRecordId = convertString(medicalRecordId)
    const doctor = await contract.getMedicalRecordForDoctor(medicalRecordId);
    const mdrInfo = await contract.getMedicalRecordInfo(medicalRecordId);

    const combindedDortorData = bindData(medicalRecordScheme, [doctor], 'doctor')
    const combindedInfoData = bindData(medicalRecordScheme, [mdrInfo], 'info')
    let medicalRecord = {...combindedDortorData,...combindedInfoData}
    medicalRecord.medicalRecordId = medicalRecordId;

    return { status: true, message: "SUCCESS", data: medicalRecord };
};

const getMedicalRecordForPharmacy = async (medicalRecordId) => {
    // console.log(medicalRecordId)
    // const byteMedicalRecordId = convertString(medicalRecordId)
    const nurse = await contract.getMedicalRecordForNursePart1(medicalRecordId);
    const pharmacy = await contract.getMedicalRecordForPharmacy(medicalRecordId);
    const combindedPharmacyData = bindData(medicalRecordScheme, [nurse,pharmacy], 'pharmacy')
    let medicalRecord = combindedPharmacyData

    return { status: true, message: "SUCCESS", data: medicalRecord };
};

const getMedicalRecord = async medicalRecordId => {
    let nurse = await getMedicalRecordForNurse(medicalRecordId);
    let doctor = await getMedicalRecordForDoctor(medicalRecordId);
    return { status: true, message: "SUCCESS", data: { ...nurse.data, ...doctor.data } };
}

const getHistoryMedicalRecord = async (citizenId, length, year=null) => {
    const byteCitizenId = convertString(citizenId)
    let medicalRecord = []
    // Sort by last
    for (let i = length-1 ; i >= 0 ; i--) {
        if (year){
            let statusSort = await contract.checkTreatmentYear(byteCitizenId, i, year)
            if (statusSort){
                // ณ i นั้นมี treatmentYear = year >> get ออกมา
                let historyData = await getHistoryData(byteCitizenId,i)
                medicalRecord.push(historyData)
            }
        }else{
            // ไม่ได้เลือกปีให้ sort
            let historyData = await getHistoryData(byteCitizenId, i)
            medicalRecord.push(historyData)
        }
    }
    if(medicalRecord.length === 0){
        return msg.getMsgSuccess(msg.msgVariable.nothaveHistoryMDR)
    }
    return { status: true, message: "SUCCESS", data: medicalRecord };

}

const getHistoryData = async (byteCitizenId , index) => {
    let medicalRecordId = await contract.getHistoryMedicalRecordPatient(byteCitizenId, index);
    // let stringMedicalRecordId = convertToAscii(byteMedicalRecordId)
    const data = await contract.getMedicalRecordForShowHistory(medicalRecordId.toString())
    const combindedHistoryData = bindData(medicalRecordScheme, [data], 'history')
    combindedHistoryData.medicalRecordId = medicalRecordId.toString();
    return combindedHistoryData
}

const isMedicalRecord = medicalRecordId => {
    // const byteMedicalRecordId = convertString(medicalRecordId)
    return contract.haveMedicalRecords(medicalRecordId)
}

const alreadyMedicalRecord = medicalRecordId => {
    // const byteMedicalRecordId = convertString(medicalRecordId)
    return contract.alreadyDataInMedicalRecordsId(medicalRecordId)
}

const haveMedicalRecordsOfPatient = (patientCitizenId, medicalRecordId) => {
    // const byteMedicalRecordId = convertString(medicalRecordId)
    const bytePatientCitizenId = convertString(patientCitizenId)
    // console.log("bytePatientCitizenId", bytePatientCitizenId)
    return contract.haveMedicalRecordsOfPatient(bytePatientCitizenId, medicalRecordId)
}

const haveMDRinPatientHistory = (patientCitizenId, medicalRecordId) => {
    // const byteMedicalRecordId = convertString(medicalRecordId)
    const bytePatientCitizenId = convertString(patientCitizenId)
    return contract.haveHistoryOfPatient(bytePatientCitizenId, medicalRecordId);
}

const lengthPatientHistory = (patientCitizenId) => {
    const bytePatientCitizenId = convertString(patientCitizenId)
    return +contract.countHistoryMedicalRecordForPatient(bytePatientCitizenId).toString();
}



module.exports = {
    setMedicalRecordForNurse,
    setMedicalRecordForDoctor,
    getMedicalRecordForNurse,
    getMedicalRecordForDoctor,
    isMedicalRecord,
    alreadyMedicalRecord,
    haveMedicalRecordsOfPatient,
    haveMDRinPatientHistory,
    getMedicalRecord,
    getHistoryMedicalRecord,
    lengthPatientHistory,
    getMedicalRecordForPharmacy,
};