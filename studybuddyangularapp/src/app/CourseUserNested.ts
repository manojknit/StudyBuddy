// CourseUserNested.ts

export default class CourseUserNested {
    user_id: String;
    user_name: String;
    course_id: String;
    course_title: String;
    registered_on: String;
    course_velocity: Number;
    course_progress: Number;
    video_details: [{
      video_id: String;
      video_title:String;
      video_file_name: String;
      video_length: Number;
      video_is_complete: Boolean;
      video_progress: Number;
      video_start_date: Date;
      video_last_accessed_date: Date;
    }]
  }