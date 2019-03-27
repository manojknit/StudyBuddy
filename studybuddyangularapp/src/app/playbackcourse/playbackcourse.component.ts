import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Video from '../Video';
import { VideoService } from '../services/video.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-playbackcourse',
  templateUrl: './playbackcourse.component.html',
  styleUrls: ['./playbackcourse.component.css']
})
export class PlaybackcourseComponent implements OnInit {
  videos: Video[];
  selectedvideo: string = "";
  selectedcourseid: string = "";
  items = [
    { value: "0", view: "zero" },
    { value: "1", view: "one" },
    { value: "2", view: "Two" }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vs: VideoService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.selectedcourseid = params['id'];
    this.selectedvideo = params['videoid'];
    this.vs
      .getVideos(params['id'])
      .subscribe((data: Video[]) => {
        //data.forEach(function (value) {
          //items.add
         // console.log(Array.of(value));
        //}); 
        this.videos = data;
        if(data[0] != undefined && data[0] != null && this.selectedvideo == null)
        {
          let filename = data[0].VideoTitle;
          this.selectedvideo = filename.slice(0, filename.lastIndexOf( '.' ));
        }
    });
  });
  }
  exit(myurl) {
    var base_url = window.location.origin;
    console.log( "myurl="+base_url+myurl);
    window.location.href = base_url+myurl;
  }
}
