const Web3 = require('web3');
let web3 = new Web3();

// try {
	// web3 = new Web3(new Web3.providers.HttpProvider("http://54.169.9.198:8545"));
	// web3.eth.defaultAccount = web3.eth.accounts[0];
	// console.log("------- have server -------")
// } catch (err) {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	web3.eth.defaultAccount = web3.eth.accounts[0];
	console.log("------- don't have server -------")
// }
console.log(web3.eth.defaultAccount)

const PatientRecordContract = web3.eth.contract(
	[
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_password",
					"type": "bytes32"
				}
			],
			"name": "Login",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "patientEmails",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "patientAccounts",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "medicalRecordList",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_patientCitizenId",
					"type": "bytes32"
				},
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "haveMedicalRecordsOfPatient",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getInfoPatientPart3",
			"outputs": [
				{
					"name": "congenitalDisease",
					"type": "bytes32"
				},
				{
					"name": "bloodGroup",
					"type": "bytes32"
				},
				{
					"name": "religion",
					"type": "bytes32"
				},
				{
					"name": "nationality",
					"type": "bytes32"
				},
				{
					"name": "country",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_patientCitizenId",
					"type": "bytes32"
				},
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "haveHistoryOfPatient",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_email",
					"type": "bytes32"
				}
			],
			"name": "haveEmail",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "haveCitizenId",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getPatientParent",
			"outputs": [
				{
					"name": "fatherFirstname",
					"type": "bytes32"
				},
				{
					"name": "fatherLastname",
					"type": "bytes32"
				},
				{
					"name": "motherFirstname",
					"type": "bytes32"
				},
				{
					"name": "motherLastname",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getPatientNameAndEmail",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getInfoPatientPart2",
			"outputs": [
				{
					"name": "dob",
					"type": "bytes32"
				},
				{
					"name": "nameTitle",
					"type": "bytes32"
				},
				{
					"name": "firstname",
					"type": "bytes32"
				},
				{
					"name": "lastname",
					"type": "bytes32"
				},
				{
					"name": "gender",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getPatientAllergy",
			"outputs": [
				{
					"name": "allergy",
					"type": "bytes32"
				},
				{
					"name": "privilege",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getInfoPatientPart1",
			"outputs": [
				{
					"name": "registerDate",
					"type": "bytes32"
				},
				{
					"name": "patientCitizenId",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getInfoPatientPart4",
			"outputs": [
				{
					"name": "status",
					"type": "bytes32"
				},
				{
					"name": "occupartion",
					"type": "bytes32"
				},
				{
					"name": "homePhonenumber",
					"type": "bytes32"
				},
				{
					"name": "mobileNumber",
					"type": "bytes32"
				},
				{
					"name": "email",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "id",
					"type": "bytes32"
				},
				{
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getHistoryMedicalRecordPatient",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecordInfo",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getEmergencyContactPart2",
			"outputs": [
				{
					"name": "emerTypeofHouse",
					"type": "bytes32"
				},
				{
					"name": "emerAddress",
					"type": "bytes"
				},
				{
					"name": "emerProvince",
					"type": "bytes32"
				},
				{
					"name": "emerDistrict",
					"type": "bytes32"
				},
				{
					"name": "emerSubDistrict",
					"type": "bytes32"
				},
				{
					"name": "emerZipcode",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_key",
					"type": "bytes32"
				}
			],
			"name": "getMedicalRecordId",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getEmergencyContactPart1",
			"outputs": [
				{
					"name": "emerTitle",
					"type": "bytes32"
				},
				{
					"name": "emerFirstname",
					"type": "bytes32"
				},
				{
					"name": "emerLastname",
					"type": "bytes32"
				},
				{
					"name": "emerRelationship",
					"type": "bytes32"
				},
				{
					"name": "emerHomePhonenumber",
					"type": "bytes32"
				},
				{
					"name": "emerMobileNumber",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecordForShowHistory",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getDetailPatient",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecordForPharmacy",
			"outputs": [
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getAddressPatient",
			"outputs": [
				{
					"name": "typeofHouse",
					"type": "bytes32"
				},
				{
					"name": "patientAddress",
					"type": "bytes"
				},
				{
					"name": "province",
					"type": "bytes32"
				},
				{
					"name": "district",
					"type": "bytes32"
				},
				{
					"name": "subDistrict",
					"type": "bytes32"
				},
				{
					"name": "zipcode",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecordForNursePart2",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_dob",
					"type": "bytes32"
				}
			],
			"name": "forgotPasswordVerify",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecordForNursePart1",
			"outputs": [
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				},
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_patientCitizenId",
					"type": "bytes32"
				}
			],
			"name": "countHistoryMedicalRecordForPatient",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecordForDoctor",
			"outputs": [
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes"
				},
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_patientCitizenId",
					"type": "bytes32"
				},
				{
					"name": "_index",
					"type": "uint256"
				},
				{
					"name": "_year",
					"type": "uint256"
				}
			],
			"name": "checkTreatmentYear",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_index",
					"type": "uint256"
				}
			],
			"name": "getMedicalRecord",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_password",
					"type": "bytes32"
				}
			],
			"name": "checkPassword",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getLengthPatientAccounts",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "alreadyDataInMedicalRecordsId",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getLengthMedicalRecords",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "haveMedicalRecords",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				}
			],
			"name": "getMobileNumber",
			"outputs": [
				{
					"name": "",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_congenitaldisease",
					"type": "bytes32"
				},
				{
					"name": "_bloodgroup",
					"type": "bytes32"
				},
				{
					"name": "_religion",
					"type": "bytes32"
				},
				{
					"name": "_nationality",
					"type": "bytes32"
				},
				{
					"name": "_country",
					"type": "bytes32"
				}
			],
			"name": "setInfoPatientPart3",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_fatherFirstname",
					"type": "bytes32"
				},
				{
					"name": "_fatherLastname",
					"type": "bytes32"
				},
				{
					"name": "_motherFirstname",
					"type": "bytes32"
				},
				{
					"name": "_motherLastname",
					"type": "bytes32"
				}
			],
			"name": "setPatientParent",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_status",
					"type": "bytes32"
				},
				{
					"name": "_occupartion",
					"type": "bytes32"
				},
				{
					"name": "_homephonenumber",
					"type": "bytes32"
				},
				{
					"name": "_mobilenumber",
					"type": "bytes32"
				},
				{
					"name": "_email",
					"type": "bytes32"
				}
			],
			"name": "setInfoPatientPart4",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_allergy",
					"type": "bytes32"
				},
				{
					"name": "_privilege",
					"type": "bytes32"
				}
			],
			"name": "setPatientAllergy",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				},
				{
					"name": "_presentIllness",
					"type": "bytes"
				},
				{
					"name": "_physicalExem",
					"type": "bytes"
				},
				{
					"name": "_diagnosis",
					"type": "bytes"
				},
				{
					"name": "_treatment",
					"type": "bytes"
				},
				{
					"name": "_recommendation",
					"type": "bytes"
				},
				{
					"name": "_appointment",
					"type": "bytes"
				},
				{
					"name": "_doctorName",
					"type": "bytes32"
				}
			],
			"name": "setMedicalRecordForDoctor",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_typeofHouse",
					"type": "bytes32"
				},
				{
					"name": "_patienaddress",
					"type": "bytes"
				},
				{
					"name": "_province",
					"type": "bytes32"
				},
				{
					"name": "_district",
					"type": "bytes32"
				},
				{
					"name": "_subDistrict",
					"type": "bytes32"
				},
				{
					"name": "_zipcode",
					"type": "bytes32"
				}
			],
			"name": "setAddressPatient",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_emerTitle",
					"type": "bytes32"
				},
				{
					"name": "_emerFirstname",
					"type": "bytes32"
				},
				{
					"name": "_emerLastname",
					"type": "bytes32"
				},
				{
					"name": "_emerRelationship",
					"type": "bytes32"
				},
				{
					"name": "_emerHomePhonenumber",
					"type": "bytes32"
				},
				{
					"name": "_emerMobileNumber",
					"type": "bytes32"
				}
			],
			"name": "setEmergencyContactPart1",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_patientCitizenId",
					"type": "bytes32"
				},
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				}
			],
			"name": "addHistoryMedicalRecord",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_password",
					"type": "bytes32"
				}
			],
			"name": "setPassword",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_medicalRecordId",
					"type": "uint256"
				},
				{
					"name": "_pulseRate",
					"type": "bytes32"
				},
				{
					"name": "_respiratoryRate",
					"type": "bytes32"
				},
				{
					"name": "_BP1",
					"type": "bytes32"
				},
				{
					"name": "_BP2",
					"type": "bytes32"
				},
				{
					"name": "_BP3",
					"type": "bytes32"
				},
				{
					"name": "_chiefComplaint",
					"type": "bytes"
				},
				{
					"name": "_nurseName",
					"type": "bytes32"
				}
			],
			"name": "setMedicalRecordForNursePart2",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_patientCitizenId",
					"type": "bytes32"
				},
				{
					"name": "_key",
					"type": "bytes32"
				},
				{
					"name": "_clinic",
					"type": "bytes"
				},
				{
					"name": "_bodyHeight",
					"type": "bytes32"
				},
				{
					"name": "_bodyWeight",
					"type": "bytes32"
				},
				{
					"name": "_bmi",
					"type": "bytes32"
				},
				{
					"name": "_temperature",
					"type": "bytes32"
				},
				{
					"name": "_date",
					"type": "bytes32"
				},
				{
					"name": "_time",
					"type": "bytes32"
				},
				{
					"name": "_treatmentYear",
					"type": "uint256"
				}
			],
			"name": "setMedicalRecordForNursePart1",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_emerTypeofHouse",
					"type": "bytes32"
				},
				{
					"name": "_emerAddress",
					"type": "bytes"
				},
				{
					"name": "_emerProvince",
					"type": "bytes32"
				},
				{
					"name": "_emerDistrict",
					"type": "bytes32"
				},
				{
					"name": "_emerSubDistrict",
					"type": "bytes32"
				},
				{
					"name": "_emerZipcode",
					"type": "bytes32"
				}
			],
			"name": "setEmergencyContactPart2",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_oldEmail",
					"type": "bytes32"
				},
				{
					"name": "_newEmail",
					"type": "bytes32"
				}
			],
			"name": "setEmail",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_key",
					"type": "bytes32"
				}
			],
			"name": "pushMedicalRecord",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_dob",
					"type": "bytes32"
				},
				{
					"name": "_titlename",
					"type": "bytes32"
				},
				{
					"name": "_firstname",
					"type": "bytes32"
				},
				{
					"name": "_lastname",
					"type": "bytes32"
				},
				{
					"name": "_gender",
					"type": "bytes32"
				}
			],
			"name": "setInfoPatientPart2",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_citizenId",
					"type": "bytes32"
				},
				{
					"name": "_registerDate",
					"type": "bytes32"
				},
				{
					"name": "_password",
					"type": "bytes32"
				}
			],
			"name": "setInfoPatientPart1",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
);



const contract = PatientRecordContract.at("0x54201fcd1517660a1766981e2b578be76ab8e3ac");

const defaultAccount = { to: web3.eth.accounts[0], gas: 10000000 }

module.exports = {
	web3,
	contract,
	defaultAccount
};