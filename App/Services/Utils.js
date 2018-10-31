const { web3 } = require('../Lib/Web3')

const convertString = string =>
    web3.fromAscii(string)

const convertToAscii = byte =>
    web3.toAscii(byte).replace(/\u0000/g, '')

const bindData = (scheme, data, type) => {
    const partType = scheme[type]
    return mappingSchemeToParts({}, partType, data)
}

const tail = ([, ...tail]) => tail

const mappingSchemeToParts = (result, partSchemes, data) => {
    const partKeys = Object.keys(partSchemes[0])
    const partTypes = Object.values(partSchemes[0])

    result = { ...result, ...mappingDataToScheme({}, partKeys, data[0], partTypes) }

    if (partSchemes.length === 1) {
        return result
    }
    return mappingSchemeToParts(result, tail(partSchemes), tail(data))
}

const mappingDataToScheme = (result, partKeys, data, partTypes) => {
    result = { ...result, [partKeys[0]]: convertValue(data[0], partTypes[0]) }
    if (partKeys.length === 1) {
        return result
    }

    return mappingDataToScheme(result, tail(partKeys), tail(data), tail(partTypes))
}

const convertValue = (data, type) => {
    if (type === 'byte') data = convertToAscii(data)
    // if (type === 'uint') data = data.toString()
    return data ? data : '-'
}
const unlockAccount = async () => {
    debugger
    let tmp = await web3.personal.unlockAccount(web3.eth.defaultAccount, '1234')
    console.log("unlockAccount", tmp)
    return tmp
}
const lockAccount = async () => {
    debugger
    let tmp = await web3.personal.lockAccount(web3.eth.defaultAccount, '1234')
    console.log("lockAccount", tmp)
    return tmp
}
module.exports = {
    convertString,
    convertToAscii,
    bindData,
    unlockAccount,
    lockAccount
}
