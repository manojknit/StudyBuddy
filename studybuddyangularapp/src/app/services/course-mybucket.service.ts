import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app.global';

@Injectable({
  providedIn: 'root'
})

export class CourseMybucketService {

  //uri = 'http://localhost:4000/courseusernested';
  uri = "";

  constructor(private http: HttpClient) {
    this.uri =GlobalVariable.BASE_API_URL+ "courseusernested";
   }

  getByUserId(id) {
    return this
            .http
            .get(`${this.uri}/getbyuserid/${id}`);
  }

  getById(id) {
    return this
            .http
            .get(`${this.uri}/getbyid/${id}`);
  }


  addCourseUserNested(user_id, user_name, course_id, course_title, registered_on, videos) {
    let videoArr = [];

    for(let i=0; i < videos.length; i++) {
      const obj1 = {
        video_id: videos[i]._id,
        video_title: videos[i].VideoTitle,
        video_file_name: videos[i].VideoFileName,
        video_length: 0,
        video_is_complete: 0,
        video_progress: 0,
        video_start_date: "",
        video_last_accessed_date: "",
        video_progress_sec: 0,
      }
      videoArr.push(obj1);
    }
    const obj = {
      user_id: user_id,
      user_name: user_name,
      course_id: course_id,
      course_title: course_title,
      registered_on: registered_on,
      started_on: "",
      course_velocity: 0,
      course_progress: 0,
      video_details: videoArr
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }


  updateVideoProgress(user_id, course_id, video_id, progress,complete, start_date, end_date, progess_sec, courseStartDate) {
    this.http.post(`${this.uri}/updateVideoProgress/${user_id}/${course_id}/${video_id}/${progress}/${complete}`,
    {
        "start_date" : start_date,
        "end_date" : end_date,
        "progress_sec": progess_sec,
        "courseStartDate" : courseStartDate
    })
        .subscribe(res => console.log('Done'));
  }

  getcourseProgress(user_id) {
    return this
            .http
            .get(`${this.uri}/getCourseProgress/${user_id}`);
  }
}
