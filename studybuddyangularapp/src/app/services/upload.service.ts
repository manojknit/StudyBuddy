import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // uri = 'http://localhost:4000/video';
  uri="";
  //ng g service business --spec=false

  constructor(private http: HttpClient) { 
    this.uri = GlobalVariable.BASE_API_URL + "video";
  }

  addVideo(courseid, filename) {
    const obj = {
      CourseId: courseid,
      VideoTitle: filename,
      VideoFileName: filename
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  //https://medium.com/ramsatt/angular-7-upload-file-to-amazon-s3-bucket-ba27022bad54
  uploadFile(file, courseid) {
    this.addVideo(courseid, file.name);
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: GlobalVariable.ACCESS_ID,
              secretAccessKey: GlobalVariable.SECRET,
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
