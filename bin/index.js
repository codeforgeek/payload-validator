
/**
* Validates the API fields and required parameters.
* @method validator
* @param {Object} incomingApiPayload The information received from the end user.
* @param {Array} expectedApiPayload The fields which are valid.
* @param {String} operationName The request name of the API.
* @param {String} method The request method of the API.
**/

function validator(incomingApiPayload, expectedApiPayload,mandatory_elements,blank_value) {
    var param = {}, undefinedParams = [], nullValues = [], blankParams = [], invalidValues = [];
    param.elements = {};
    param.response = {};
    param.success = true;
    function validateChildValues(key) {
        var string_value;
        var arrValue;
        for(var i = 0; i < incomingApiPayload[key].length; i++) {
            if(expectedApiPayload[key][0] !== undefined && typeof(expectedApiPayload[key][0]) !== typeof(incomingApiPayload[key][i])) {
                param.response.errorMessage = "Parameter '" + key + "' value expected is '" + Object.prototype.toString.call(incomingApiPayload[key]).slice(8, -1) + "' of an '" + Object.prototype.toString.call(expectedApiPayload[key][0]).slice(8, -1) + "'";
                param.success = false;
            } else {
                arrValue = (expectedApiPayload[key][0] !== undefined) ? validator(incomingApiPayload[key][i], expectedApiPayload[key][0],mandatory_elements,blank_value) : incomingApiPayload[key][i];
                string_value = (typeof(arrValue) === "string") ? true : false;
                if(!string_value && (arrValue === null || !arrValue.success)) {
                    param.success = false;
                    var temp_resp = {};
                    temp_resp.errorMessage = "Invalid parameter value";
                    param.response = ((arrValue === null || arrValue.response === undefined || arrValue.response === null) ? temp_resp : arrValue.response);
                } else {
                    param.elements[key].push(string_value ? arrValue : arrValue.elements);
                }
            }
            if(!param.success) {
                break;
            }
        }
    }
    for(var key in expectedApiPayload) {
        if(incomingApiPayload[key] === undefined) {
            if(mandatory_elements.indexOf(key) !== -1) {
                undefinedParams.push(key);
                param.success = false;
            }
        } else if(incomingApiPayload[key] === null) {
            nullValues.push(key);
            param.success = false;
        } else if(typeof(incomingApiPayload[key]) !== typeof(expectedApiPayload[key]) || (typeof(expectedApiPayload[key]) === "object" && expectedApiPayload[key] instanceof Array !== incomingApiPayload[key] instanceof Array)) {
            invalidValues.push(key);
            param.success = false;
        } else if (typeof(expectedApiPayload[key]) === "object" && Object.keys(incomingApiPayload[key]).length === 0) {
            blankParams.push(key);
            param.success = false;
        } else if (typeof(expectedApiPayload[key]) === "object" && !(incomingApiPayload[key] instanceof Array)) {
            param.elements[key] = {};
            var value = validator(incomingApiPayload[key], expectedApiPayload[key],mandatory_elements,blank_value);
            if(value.success) {
                param.elements[key] = value.elements;
            } else {
                param.success = false;
                param.response = value.response;
            }
        } else if (typeof(expectedApiPayload[key]) === "object" && incomingApiPayload[key] instanceof Array) {
            param.elements[key] = [];
            validateChildValues(key);
        } else if(typeof(expectedApiPayload[key]) === "string" && incomingApiPayload[key].trim() === "") {
            if(!!blank_value && mandatory_elements.indexOf(key) === -1) {
                param.elements[key] = incomingApiPayload[key];
            } else {
                blankParams.push(key);
                param.success = false;
            }
        } else if(typeof(expectedApiPayload[key]) === "number" && incomingApiPayload[key] < 0) {
            param.success = false;
            param.response.errorMessage = "Parameter '" + key + "' value must have a positive number";
        } else {
            param.elements[key] = incomingApiPayload[key];
        }
        if(!param.success) {
            delete param.elements;
            break;
        }
    }
    if(param.success) {
        delete param.response;
        return param;
    }
    if(undefinedParams.length !== 0) {
        param.response.errorMessage = "Parameter '" + undefinedParams.join(",") + "' required is missing";
        param.response.errorKey = undefinedParams;
    } else if(nullValues.length !== 0) {
        param.response.errorMessage = "Parameter '" + nullValues.join(",") + "' value cannot be null";
        param.response.errorKey = nullValues;
    } else if(invalidValues.length !== 0) {
        param.response.errorMessage = "Parameter '" + invalidValues.join(",") + "' value expected is " + "'" + Object.prototype.toString.call(expectedApiPayload[invalidValues[0]]).slice(8, -1) + "'";
        param.response.errorKey = invalidValues;
    } else if(blankParams.length !== 0) {
        param.response.errorMessage = "Parameter '" + blankParams.join(",") + "' value passed is blank";
        param.response.errorKey = blankParams;
    }
    return param;
}
module.exports.validator = validator;
