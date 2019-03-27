import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

//https://medium.com/ramsatt/angular-7-upload-file-to-amazon-s3-bucket-ba27022bad54
  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIA',
              secretAccessKey: '7jxc9',
              region: 'us-east-1'
          }
      );
      const params = {
          Bucket: 'studybuddy-494875521123-us-east-1-494875521123-us-east-1',
          Key: "inputfiles/"+file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });
//for upload progress   
/*bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });*/
    }

}
