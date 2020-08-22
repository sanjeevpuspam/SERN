exports.ResponseObject = {
    status :true,
    message :"",
    result : {}
}
exports.CreateResponse = function (status, message, data, callback) {
    var responseObject = JSON.parse(JSON.stringify(exports.ResponseObject));
    responseObject.status = status;
    responseObject.message = message;
    responseObject.result = data;
    callback(responseObject);
}