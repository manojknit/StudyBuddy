import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // uri = 'http://localhost:4000/video';
  uri="";

  constructor(private http: HttpClient) { 
    this.uri = GlobalVariable.BASE_API_URL + "video";
  }
   //Videos
   getVideos(id) {
    return this
            .http
            .get(`${this.uri}/getbycourseid/${id}`);
    }
}
