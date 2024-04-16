const AWS = require('aws-sdk');
const fs = require('fs');
const process = require('process');

function uploadPkgToR2(accountId, secretAccessKey, accessKeyId, bucketName, filename, uploadFilePath) {
  const endpointUrl = `https://${accountId}.r2.cloudflarestorage.com`;

  // Configure the AWS SDK to use the custom endpoint and credentials
  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(endpointUrl),
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    s3ForcePathStyle: true, // needed with custom endpoint
    signatureVersion: 'v4'
  });

  console.log(`Uploading asset: ${filename} to ${uploadFilePath} in bucket ${bucketName}, using ${endpointUrl}`);

  // Set up the parameters for the S3 upload
  const params = {
    Bucket: bucketName,
    Key: uploadFilePath,
    Body: fs.createReadStream(filename)
  };

  // Perform the upload to S3 (R2 in this case)
  s3.upload(params, function(err, data) {
    if (err) {
      console.log("An error occurred", err);
      throw err;
    }
    console.log(`Successfully uploaded '${filename}' to ${data.Location}`);
  });
}

if (process.argv.length < 4) {
  console.log("Usage: node deploy.js <filename> <upload_file_path>");
  process.exit(1);
}

const accountId = process.env.ACCOUNT_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const accessKeyId = process.env.ACCESS_KEY_ID;
const bucketName = "archive";
const filename = process.argv[2];
const uploadFilePath = process.argv[3];

uploadPkgToR2(accountId, secretAccessKey, accessKeyId, bucketName, filename, uploadFilePath);
