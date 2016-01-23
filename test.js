var payloadCheck = require('./bin');

var target = {
    "someString" : "",
    "someNumber" : 0,
    "someArray"  : [1]
}

var source = {
    "someString" : "Hello",
    "someNumber" : 1,
    "someArray" : [1]
}

var result = payloadCheck.validator(source,target,["someString"],false);
console.log(result);
