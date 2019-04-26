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
  videoStartDate: any ={};
  videoLastAccessedDate: any= {};
  user_id: string ="";
  selectedVideoId: string ="";

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
  seventyFive = false;
  fifty = false;
  twntyFive = false;
  progress = 0;
  current_time = 0;

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

          localStorage.setItem('videoStartDate' , this.courseusernested.video_details[0].videoStartDate);
          if(this.courseusernested.video_details[0].videoStartDate == undefined ) {
            localStorage.setItem('videoStartDate' , this.date);
          }

          localStorage.setItem('courseStartDate' , this.courseusernested.courseStartDate);
          if(this.courseusernested.courseStartDate == undefined || this.courseusernested.courseStartDate == null ||
            this.courseusernested.courseStartDate == "") {
            localStorage.setItem('courseStartDate' , this.date);
          }

          localStorage.setItem('videoLastAccessedDate', this.date);
          localStorage.setItem('selectedcourseid1', this.courseusernested.course_id);
          localStorage.setItem('user_id', this.courseusernested.user_id);

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
    console.log( this.selectedvideo + " : " + value.target.currentTime + " : " + value.target.duration);
    let percent = (value.target.currentTime / value.target.duration) * 100;
    this.current_time = value.target.currentTime;
    if(percent >= 75 && this.seventyFive == false) {
      this.seventyFive = true;
      this.progress = 75;
      console.log("seventy five");
      this.gtag.event(this.selectedvideo, {
        'event_category': 'Video Playback',
        'event_label': '75%', 'event_callback': function() {
          console.log("call back");
        }
      });

    }else if(percent >= 50 && this.fifty == false) {
      this.fifty = true;
      this.progress = 50;
      console.log("fifty");
      this.gtag.event(this.selectedvideo, {
        'event_category': 'Video Playback',
        'event_label': '50%', 'event_callback': function() {
          console.log("call back");
        }
      });
    }else if(percent >= 25 && this.twntyFive == false) {
      this.progress = 25;
      this.twntyFive = true;
      console.log("twenty five");
      this.gtag.event(this.selectedvideo, {
        'event_category': 'Video Playback',
        'event_label': '25%', 'event_callback': function() {
          console.log("call back");
        }
      });
    }
  }

  public onEnded(value) {
    this.gtag.event(this.selectedvideo, {
      'event_category': 'Video Playback',
      'event_label': '100%', 'event_callback': function() {
        console.log("Event call back");
      }
    });
    this.cbs.updateVideoProgress(localStorage.getItem('user_id') , 
                                localStorage.getItem('selectedcourseid1'), 
                                this.selectedvideo, 
                                100, true, 
                                localStorage.getItem('videoStartDate'), 
                                localStorage.getItem('videoLastAccessedDate'),
                                this.current_time, localStorage.getItem('courseStartDate')); 
    console.log("Video Ended updated");
    
  }

  public onPause(value) {
    console.log("Video Paused 111");

    this.gtag.event(this.selectedvideo, {
      'event_category': 'Video Playback',
    
      'event_label': 'Paused', 'event_callback': function() {
        console.log("event call back");
      }
    });
    this.cbs.updateVideoProgress(localStorage.getItem('user_id') , 
                                localStorage.getItem('selectedcourseid1'), 
                                this.selectedvideo, 
                                this.progress, false, 
                                localStorage.getItem('videoStartDate'), 
                                localStorage.getItem('videoLastAccessedDate'),
                                this.current_time,localStorage.getItem('courseStartDate'));    
    console.log("Pause Event Published ");
  }

  public calcPercent(a,b) {
    if(b == 0) 
        return 0;
    // console.log("val is " + a + " : " + b + " : " + (a/b));
    return (a/b)*100;
  }
}
