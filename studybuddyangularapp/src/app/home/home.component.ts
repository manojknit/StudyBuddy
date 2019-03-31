import { Component, OnInit } from '@angular/core';
import Course from '../Course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Course[];

  constructor(private bs: CourseService) {
    console.log("inside bs " + bs.getCourses());
   }

 // constructor() { }

  ngOnInit() {
      this.bs
      .getCourses()
      .subscribe((data: Course[]) => {
        this.courses = data;

        console.log("data is " + this.courses[0].course_title);

    });

    
  }

}
