# API Payload Validator for Node.js

This module is developed for cross verifying the structure and data of payload. Currently it supports JSON only. It works this way.

* Provide the incoming payload.
* Provide the target payload.
* Choose mandatory fields.
* Tell whether blank field is allowed or not.

Once you provide these information, this module will check the structure of JSON Object against the target one. It checks the expected values as well. For.eg if key in payload expects the number and incoming payload contains string value. It also validates following :

* blank value.
* JSON key missing ( Only if provided mandatory )
* Data type of keys ( String, number, array, object )

## How to install

You can install this module by typing

```javascript
npm install payload-validator
```

Include the module in file.

```javascript
var payloadCheck = require('payload-validator');
```

Call the function using following syntax.

```javascript
 var result = payloadCheck.validator(
     incomingApiPayload,
     expectedPayload,
     mandatory elements array,
     blank value flag
    )
 ```

Check for result.success key in order to know validation failed or not. If its false look for result.response.errorMessage for exact error.

## Example.

### Expected payload
```javascript
var source = {
    "someString" : "", // represent string
    "someNumber" : 0, // represent number
    "someObject" : {},
    "someArray"  : []
}
```
### Incoming payload

```javascript
var target = {
    "someString" : "Hello",
    "someNumber" : 0,
    "someObject" : {},
    "someArray" : [1,2]
}
```
### Validator result.

```javascript
var result = payloadCheck.validator(source, target, ["someNumber"], true);
console.log(result);
```
Here is the result.

```javascript
{ response:
   {
       errorMessage: 'Parameter \'someObject\' value passed is blank',
       errorKey: [ 'someObject' ]
   },
  success: false
}
```
If you pass unexpected data such number but expected is String so you will get error message like this.

```javascript
{ response:
   {
       errorMessage: 'Parameter \'someString\' value expected is \'Number\'',
       errorKey: [ 'someString' ]
   },
  success: false
}
```
Once validation is successful you will receive following message.

```javascript
{
    elements: {
        someString: 'Hello',
        someNumber: 1,
        someArray: [ {} ]
    },
  success: true
}
```
