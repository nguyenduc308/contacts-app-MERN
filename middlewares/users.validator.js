const { isEmpty, isEmail } = require('../util/validator')

exports.validatorSignUp = (data) => {
    let errors = {}
    if(isEmpty(data.email)) {
        errors.email = "Email is required"
    } else if(!isEmail(data.email)) {
        errors.email = "Email invalid"
    }
    if(isEmpty(data.password)) {
        errors.email = "Password is required"
    } else if(data.password.length < 6) {
        errors.password = "Password is weak"
    }
    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = "Password confirm do not match"
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validatorLogin = (data) => {
    let errors = {}
    if(isEmpty(data.email)) {
        errors.email = "Email is required"
    }
    if(isEmpty(data.password)) {
        errors.email = "Password is required"
    } 
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

