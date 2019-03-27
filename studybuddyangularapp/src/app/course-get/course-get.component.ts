import { Component, OnInit } from '@angular/core';
import Course from '../Course';
import { CourseService } from '../services/course.service';

//https://appdividend.com/2018/11/04/angular-7-crud-example-mean-stack-tutorial/
@Component({
  selector: 'app-course-get',
  templateUrl: './course-get.component.html',
  styleUrls: ['./course-get.component.css']
})
export class CourseGetComponent implements OnInit {

  courses: Course[];

  constructor(private bs: CourseService) { }

  ngOnInit() {
    this.bs
      .getCourses()
      .subscribe((data: Course[]) => {
        this.courses = data;
    });
  }

  deleteBusiness(id) {
    this.bs.deleteCourse(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}