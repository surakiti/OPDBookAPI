const msgVariable = {
    citizenID : "citizent Id",
    medicalRecord: "medical record",
    medicalRecordId: "medical record Id",
    email: "email",
    doctorNotAssign: "Doctor has not assign this medical record yet",
    alreadyMRDinPatientHistory: "This medical record is already in the patient history.",
    nothaveHistoryMDR : "Not have any history medical record",
    dob: "date of birth",
}

const getMsgNotFound = (field, data = null) => {
    status = false;
    message = `ERROR : This ${field} is not in the system. Please try again.`;
    if (data) {
        data = data;
        return { status: status, message: message, data: data };
    }
    return { status: status, message: message };
};

const getMsgSuccess = (msg=null,data = null) => {
    status = true;
    message = msg ? msg : "SUCCESS";
    if (data) {
        data = data;
        return { status: status, message: message, data: data };
    }
    return { status: status, message: message };
};

const getMsgDuplicate = (field, data = null) => {
    status = false;
    message = `ERROR : This ${field} is already in the system.`;
    if (data) {
        data = data;
        return { status: status, message: message, data: data };
    }
    return { status: status, message: message };
};

const getMsgNotMatch = (field1,field2) => {
    status = false;
    message = `ERROR : The ${field1} and ${field2} are not match`;
    return { status: status, message: message };
};

const getMsgError = (text) => {
    status = false;
    message = "ERROR : " + text;
    return { status: status, message: message };
};

module.exports = {
    getMsgNotFound,
    getMsgSuccess,
    getMsgDuplicate,
    getMsgError,
    getMsgNotMatch,
    msgVariable
};