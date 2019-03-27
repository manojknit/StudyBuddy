import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-uploadcourse',
  templateUrl: './uploadcourse.component.html',
  styleUrls: ['./uploadcourse.component.css']
})
export class UploadcourseComponent implements OnInit {
  selectedFiles: FileList;
  errorMsg = '';
  registrationForm = new FormGroup({
    userName: new FormControl('w'),
    courseTitle: new FormControl('Course1'),
    courseDescription: new FormControl('Course Desc'),
    category: new FormControl('')
  });
  //constructor() { }
  constructor(private route: ActivatedRoute,
      private router: Router,
      private uploadService: UploadService) {}
  //constructor(private uploadService: UploadService) { }
  ngOnInit() {
  }

  onClickMe(event: any) {
    this.errorMsg += event.target.value + ' | ';
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.route.params.subscribe(params => {
    this.uploadService.uploadFile(file, params['id']);
      });
    }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    }

    onSubmit() {
      console.log(this.registrationForm.value);
    }
}
