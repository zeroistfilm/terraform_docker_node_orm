const AWS = require('aws-sdk');
const fs  = require('fs');
require("dotenv").config();

const s3 = new AWS.S3({
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "ap-northeast-2" 
});
 

var filename = '1.jpg'
var param = {
    'Bucket':'tf101-yd-apne2-tfstate',
    'Key': 'image/' + filename,
    'ACL':'public-read',
    'Body':fs.createReadStream(filename),
    'ContentType':'image/png'
}


s3.upload(param, function(err, data){
    console.log(err);
    console.log(data);
});