import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // uri = 'http://localhost:4000/course';
  uri="";

  constructor(private http: HttpClient) { 
    this.uri = GlobalVariable.BASE_API_URL + "course";
  }

  addCourse(user_name, course_title, course_desc, category, course_rating, tenantid, fee, short_text, instructions) {
    const obj = {
      user_name: user_name,
      course_title: course_title,
      course_desc: course_desc,
      category: category,
      course_rating: course_rating,
      tenantid: tenantid,
      fee: fee,
      short_text: short_text,
      instructions: instructions
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getCourses() {
  return this
         .http
         .get(`${this.uri}`);
  }

  editCourse(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

  updateCourse(user_name, course_title, course_desc, category, course_rating, tenantid, fee, short_text, instructions, id) {

    const obj = {
      user_name: user_name,
      course_title: course_title,
      course_desc: course_desc,
      category: category,
      course_rating: course_rating,
      tenantid: tenantid,
      fee: fee,
      short_text: short_text,
      instructions: instructions
      };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteCourse(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }
}
