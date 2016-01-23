var payloadCheck = require('./bin');

var source = {
    "someString" : "", // represent string
    "someNumber" : 0, // represent number
    "someObject" : {},
    "someArray"  : []
}

var target = {
    "someString" : "Hello",
    "someNumber" : 0,
    "someObject" : {},
    "someArray" : [1,2]
}

var result = payloadCheck.validator(source,target,["someString"],true);
console.log(result);
