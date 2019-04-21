import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  uri="";

  constructor(private http: HttpClient) {
      this.uri = GlobalVariable.BASE_API_URL+"CourseUserNested";
   }

  getUserVelocityList() {
    return this
           .http
           .get(`${this.uri}/getForVelocity`);
  }
}
