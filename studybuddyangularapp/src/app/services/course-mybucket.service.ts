import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseMybucketService {

  uri = 'http://localhost:4000/courseusernested';

  constructor(private http: HttpClient) { }

  getByUserId(id) {
    return this
            .http
            .get(`${this.uri}/getbyuserid/${id}`);
  }


  addCourseUserNested(user_id, user_name, course_id, course_title, registered_on, videos) {
    let videoArr = [];

    for(let i=0; i < videos.length; i++) {
      const obj1 = {
        video_id: videos[i]._id,
        video_title: videos[i].video_title,
        video_file_name: videos[i].video_file_name,
        video_length: 0,
        video_is_complete: 0,
        video_progress: 0,
        video_start_date: "",
        video_last_accessed_date: ""
      }
      videoArr.push(obj1);
    }
    const obj = {
      user_id: user_id,
      user_name: user_name,
      course_id: course_id,
      course_title: course_title,
      registered_on: registered_on,
      course_velocity: 0,
      course_progress: 0,
      video_details: videoArr
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
