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
  progress_data: any =  {} ;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private cbs: CourseMybucketService) {
      this.route.params.subscribe(params => {
        //this.selecteduserid = params['id'];
        let user = JSON.parse(localStorage.getItem("user")); 
        this.selecteduserid = user.email;
        this.cbs.getByUserId(this.selecteduserid)
          .subscribe((data: CourseUserNested[]) => {
            this.courseUserNested = data;
            console.log("course user nested " + this.courseUserNested[0]);

            this.cbs.getcourseProgress(this.selecteduserid)
            .subscribe((data1) => {
              console.log("progress data " + data1);
              this.progress_data = data1;
            });
        });
    });
     }

    ngOnInit() {
      
    }

    calcCourseProgress(course_id) {
      if(this.progress_data[0] != undefined) {
        let i=0;
        for( i = 0; i < this.progress_data.length ; i++) {
          if(this.progress_data[i]._id.course_id == course_id) {
            let progress = this.progress_data[i].totalProgress/this.progress_data[i].total_videos;
            return progress;
          }
        }
      }
    }
}
