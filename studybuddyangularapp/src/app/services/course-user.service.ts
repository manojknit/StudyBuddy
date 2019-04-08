import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseUserService {

  uri = 'http://localhost:4000/courseuser';

  constructor(private http: HttpClient) { }

  addCourseUser(user_id, user_name, course_id, registered_on) {
    const obj = {
      user_id: user_id,
      user_name: user_name,
      course_id: course_id,
      registered_on: registered_on
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getCourseUsers() {
  return this
         .http
         .get(`${this.uri}`);
  }
}
