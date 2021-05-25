const AWS = require('aws-sdk');
const fs = require('fs');
require("dotenv").config();

const s3 = new AWS.S3({
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "ap-northeast-2"
});


var uploadParams = {
    'Bucket': 'tf101-yd-apne2-tfstate',
    'Key': '', // pass key
    'Body': null, // pass file body
    'ACL':'public-read'
}

s3.uploadParams = uploadParams;

module.exports = s3;

// s3.upload(param, function(err, data){
//     console.log(err);
//     console.log(data);
// });

