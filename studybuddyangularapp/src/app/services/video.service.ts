import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  uri = 'http://localhost:4000/video';

  constructor(private http: HttpClient) { }
   //Videos
   getVideos(id) {
    return this
            .http
            .get(`${this.uri}/getbycourseid/${id}`);
    }
}
