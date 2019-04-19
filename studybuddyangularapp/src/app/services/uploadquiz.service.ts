import { Injectable } from '@angular/core';
//import * as AWS from 'aws-sdk/global';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadquizService {
  uri = 'http://localhost:4000/quiz';

  constructor(private http: HttpClient) { }

  addQuiz(courseid, filename, jsonObj) {
    courseid = '5c9f12cc456fe90901ac7418';
   // const csv = require('csvtojson');
    const obj = {
      CourseId: courseid,
      quizFileName: filename,
      quizObject: jsonObj
    };
    console.log(obj);
    this.http.post(`${this.uri}/addQuiz`, obj)
        .subscribe(res => console.log('Done'));
  }

  uploadQuiz(file, courseid) {
   // this.addQuiz(courseid, file.name);
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIA',
              secretAccessKey: '7jxc',
              region: 'us-east-1'
          }
      );
      const params = {
          Bucket: 'studybuddyquizupload',
          Key: "inputquizfiles/" + file.name,
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
