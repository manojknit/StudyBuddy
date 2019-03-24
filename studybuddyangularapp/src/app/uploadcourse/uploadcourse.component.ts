import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-uploadcourse',
  templateUrl: './uploadcourse.component.html',
  styleUrls: ['./uploadcourse.component.css']
})
export class UploadcourseComponent implements OnInit {

  constructor() { }

  

  ngOnInit() {
  }

  errorMsg = '';

  onClickMe(event: any) {
    this.errorMsg += event.target.value + ' | ';
  }

  
}
