const medicalRecordScheme = {
    info : [
        {
            patientCitizenId: 'byte',
            treatmentYear: 'uint'
        }
    ],
    nurse: [
        {
            clinic: 'byte',
            height: 'byte',
            bodyWeight: 'byte',
            bmi: 'byte',
            temperature: 'byte',
            date: 'byte',
            time: 'byte',
            // medicalRecordId: 'byte',
        },
        {
            pulseRate: 'byte',
            respiratoryRate: 'byte',
            BP1: 'byte',
            BP2: 'byte',
            BP3: 'byte',
            chiefComplaint: 'byte',
            nurseName: 'byte',
        },
    ],
    doctor: [
        {
            presentIllness: 'byte',
            physicalExem: 'byte',
            diagnosis: 'byte',
            treatment: 'byte',
            recommendation: 'byte',
            appointment: 'byte',
            doctorName: 'byte',
        }
    ],
    pharmacy: [
        {
            clinic: 'byte',
            height: 'byte',
            bodyWeight: 'byte',
            bmi: 'byte',
            temperature: 'byte',
            date: 'byte',
            time: 'byte',
            // medicalRecordId: 'byte',
        },
        {
            treatment: 'byte',
            recommendation: 'byte',
            appointment: 'byte',
            doctorName: 'byte',
            patientCitizenId: 'byte',
        }
    ],
    history: [
        {
            date: 'byte',
            doctorName: 'byte',
            clinic: 'byte',
        }
    ]
}

module.exports = {
    medicalRecordScheme
};