import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Video from '../Video';
import CourseUserNested from '../CourseUserNested';
import { CourseMybucketService } from '../services/course-mybucket.service';
import * as $ from 'jquery';
import { Gtag } from 'angular-gtag';
import Quiz from '../Quiz';
import { QuizService } from '../services/quiz.service';
import { stringList } from 'aws-sdk/clients/datapipeline';
@Component({
  selector: 'app-playbackcourse',
  templateUrl: './playbackcourse.component.html',
  styleUrls: ['./playbackcourse.component.css']
})
export class PlaybackcourseComponent implements OnInit {
  // videos: Video[];
  selectedvideo: string = "";
  selectedcourseid: string = "";
  courseusernested:  any = {}
  quizid: string;
  //quizzes: Quiz;
  items = [
    { value: "0", view: "zero" },
    { value: "1", view: "one" },
    { value: "2", view: "Two" }
  ];
  gtag: Gtag;
  date: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cbs: CourseMybucketService, gtag: Gtag, private qs: QuizService) {
      this.gtag = gtag;
     }

  ngOnInit() {
    var DateObj = new Date();
    //let quizid;
    this.date = DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);
        
    this.route.params.subscribe(params => {
    this.selectedcourseid = params['id'];
    this.selectedvideo = params['videoid'];
    
    this.qs.getQuizIdbyCourseId(this.selectedcourseid).subscribe((data: string) => {
      if(data != null || data!= undefined) {
        this.quizid = data;
        console.log('in  getQuizIdbyCourseId - quiz id ' + data);
      }
   else
   {
      this.quizid = null;
  //  this.quizid = '5cb4ec6117e6b47850cbf9eb';
   } 
   
   // console.log("quiz obj in get quiz id  " + JSON.stringify(this.quizzes));
   
    });
    this.cbs
      .getById(this.selectedcourseid)
      .subscribe(data => {
        //data.forEach(function (value) {
          //items.add
         // console.log(Array.of(value));
        //}); 
        // this.courseUserNested = data;
        this.courseusernested = data[0];
        if(data != undefined && data != null  
           && this.selectedvideo == null)
        {
          console.log(this.courseusernested + ":" + this.courseusernested.user_name + " : " + this.courseusernested.video_details);
          let filename = this.courseusernested.video_details[0].video_title;
          this.selectedvideo = filename.slice(0, filename.lastIndexOf( '.' ));
          console.log("selected video " + this.selectedvideo);
        }
    });
  });
  }
  exit(myurl) {
    var base_url = window.location.origin;
    console.log( "myurl="+base_url+myurl);
    window.location.href = base_url+myurl;
  }

  public onTimeUpdate(value){
    //console.log( this.selectedvideo + " : " + value.target.currentTime + " : " + value.target.duration);
    //telemetry
  }

  public onEnded(value) {
    console.log("Video Ended");
    
  }

  public onPause(value) {
    console.log("Video Paused 111");

    this.gtag.event(this.selectedvideo, {
      'event_category': 'Video Playback',
      'event_label': 'test1', 'event_callback': function() {
        console.log("call back");
      }
    });

    console.log("Pause Event Published ");
  }

  public calcPercent(a,b) {
    if(b == 0) 
        return 0;
    console.log("val is " + a + " : " + b + " : " + (a/b));
    return (a/b)*100;
  }
}
