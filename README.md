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

```npm install nameofpackage```

Include the module in file.

``` var payloadCheck = require('payload-validator'); ```

Call the function using following syntax.

``` var result = payloadCheck.validator(incomingApiPayload, expectedPayload, mandatory elements array, blank value flag) ```

Check for result.success key in order to know validation failed or not. If its false look for result.response.errorMessage for exact error.

## Example.

### Expected payload

var source = {
    "someString" : "", // represent string
    "someNumber" : 0 // represent number
    "someObject" : {},
    "someArray"  : []
}

```
var target = {
    "someString" : "Hello",
    "someNumber" : 0,
    "someObject" : {},
    "someArray" : [1,2]      
}

```
var result = payloadCheck.validator(source, target, ["someNumber"], true);
console.log(result);
```
