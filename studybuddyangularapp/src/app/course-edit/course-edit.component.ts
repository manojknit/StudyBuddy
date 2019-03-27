import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  angForm: FormGroup;
  course: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: CourseService,
    private fb: FormBuilder) {
      this.createForm();
     }

  createForm() {
    this.angForm = this.fb.group({
      user_name: ['', Validators.required ],
      course_title: ['', Validators.required ],
      course_desc: ['', Validators.required ],
      category: ['', Validators.required ],
      course_rating: ['', Validators.required ]
      });
    }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bs.editCourse(params['id']).subscribe(res => {
        this.course = res;
      });
    });
  }

  updateCourse(user_name, course_title, course_desc, category, course_rating) {
   this.route.params.subscribe(params => {
      this.bs.updateCourse(user_name, course_title, course_desc, category, course_rating, params['id']);
      this.router.navigate(['course']);
   });
}
}
