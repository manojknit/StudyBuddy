import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CourseUserNested from '../CourseUserNested';
import { CourseMybucketService } from '../services/course-mybucket.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-course-mybucket',
  templateUrl: './course-mybucket.component.html',
  styleUrls: ['./course-mybucket.component.css']
})

export class CourseMybucketComponent implements OnInit {

  courseUserNested: CourseUserNested[];
  selecteduserid: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cbs: CourseMybucketService) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
      this.selecteduserid = params['id'];
      this.cbs.getByUserId(params['id'])
        .subscribe((data: CourseUserNested[]) => {
          //data.forEach(function (value) {
            //items.add
           // console.log(Array.of(value));
          //}); 
          this.courseUserNested = data;
          console.log("course user nested " + this.courseUserNested[0]);
      });
    });
    }

}
