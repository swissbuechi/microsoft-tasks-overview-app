let required = (propertyType) => {
    return v => v && v.length > 0 || v == 'object' || `${propertyType} is required`
}
let requiredAutocomplete = (propertyType) => {
    return v => !!v || `${propertyType} muss eingeben werden`
}

let requiredAutocompleteMultiple = (propertyType) => {
    return v => !!v && v.length > 0 || `${propertyType} muss eingeben werden`
}

let requireNumber = (propertyType) => {
    return v => v && v > 0 || `${propertyType} muss eingeben werden`
}

let requireNumberOrZero = (propertyType) => {
    return v => v && v > 0 || v === 0 || `${propertyType} muss eingeben werden`
}

let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} muss mindestens ${minLength} Zeichen lang sein`
}

let minLengthOptional = (propertyType, minLength) => {
    return v => v && v.length >= minLength || v == null || v === "" || `${propertyType} muss mindestens ${minLength} Zeichen lang sein`
}

let maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} darf maximal ${maxLength} Zeichen lang sein`
}

let maxValue = (propertyType, maxValue) => {
    return v => v && v <= maxValue || `${propertyType} darf maximal ${maxValue} sein`
}

let minValue = (propertyType, minValue) => {
    return v => v && v >= minValue || `${propertyType} muss mindestens ${minValue} sein`
}

let maxLengthOptional = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || v == null || v === "" || `${propertyType} darf maximal ${maxLength} Zeichen lang sein`
}

let emailFormat = () => {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,24})+$/
    return v => v && regex.test(v) || "Muss eine gültige E-Mail Adresse sein"
}

export default {
    required,
    minLength,
    minLengthOptional,
    maxLength,
    maxValue,
    minValue,
    maxLengthOptional,
    emailFormat,
    requireNumber,
    requireNumberOrZero,
    requiredAutocomplete,
    requiredAutocompleteMultiple,
}