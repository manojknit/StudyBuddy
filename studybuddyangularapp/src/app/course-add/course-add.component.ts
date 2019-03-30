import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: CourseService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      user_name: ['', Validators.required ],
      course_title: ['', Validators.required ],
      course_desc: ['', Validators.required ],
      category: ['', Validators.required ],
      course_rating: ['', Validators.required ],
      tenantid: ['', Validators.required ],
      fee: ['', Validators.required ],
      short_text: ['', Validators.required ],
      instructions: ['', Validators.required ]
    });
  }

  addCourse(user_name, course_title, course_desc, category, course_rating, tenantid, fee, short_text, instructions) {
    this.bs.addCourse(user_name, course_title, course_desc, category, course_rating,  tenantid, fee, short_text, instructions);
  }

  ngOnInit() {
  }

}
