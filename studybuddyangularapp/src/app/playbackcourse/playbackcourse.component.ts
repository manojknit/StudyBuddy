import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playbackcourse',
  templateUrl: './playbackcourse.component.html',
  styleUrls: ['./playbackcourse.component.css']
})
export class PlaybackcourseComponent implements OnInit {
  title = 'studybuddyangularapp';
  selectedValue: string = "";
  items = [
    { value: "0", view: "zero" },
    { value: "1", view: "one" },
    { value: "2", view: "Two" }
  ];

  constructor() {}

  ngOnInit() {
  }
}
