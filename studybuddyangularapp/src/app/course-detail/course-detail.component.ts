import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { CourseMybucketService } from '../services/course-mybucket.service';
import Video from '../Video';
import { VideoService } from '../services/video.service';
import { Gtag } from 'angular-gtag';

declare let paypal: any;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  paypalLoad: boolean = true;
  angForm: any;
  addScript: boolean;
  finalAmount: number = 10;
  course_id: string;
  course_title: string;
  user_name: string;
  user_id: string;
  videos: Video[];


  course: any = {};
  gtag: Gtag;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: CourseService,
    private cus: CourseMybucketService,
    private fb: FormBuilder, 
    private vs: VideoService,
    gtag: Gtag) {
      this.gtag = gtag;
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

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.bs.editCourse(params['id']).subscribe(res => {
        this.course = res;
        this.course_id = params['id'];
        this.course_title = this.course.course_title;
        let user = JSON.parse(localStorage.getItem("user")); 
        this.user_id = user.email;
        this.user_name = user.name.username;
        console.log("id : " + this.course_id + "  && user_name : " + this.user_name + " && user_id : " + this.user_id);

        this.gtag.event( 'view_item', 
        { 
          event_label: this.course.course_title, 
          "items": [
          {
            "id": this.course.course_id,
            "name": this.course.course_title,
            "price": '10.0'
          }
        ]
      });
      });
    });

    this.route.params.subscribe(params => {
      this.vs
        .getVideos(params['id'])
        .subscribe((data: Video[]) => {
          //data.forEach(function (value) {
            //items.add
          // console.log(Array.of(value));
          //}); 
          this.videos = data;
          console.log("Videos are : " + this.videos);
      });
    });
  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      //sandbox: 'AaO01fmAlA9twTeHBnPnMo6Yj5xSHEfUhPE_qNAJ9sJQuxNx_fCJEqX23bZEhFC5v1Fx_EWVBl2rCaAn',
      sandbox: 'AcdNp1HApF9K_l39FSYPbOg-TvdHzQkm3ohI1_W2wyptBQddf3oa5COJeZx0qRRslC_TZbVn02oJVzvE',
      production: '<your-production-key here>'
    },
    style: {
      size: 'large'
      /*,color: 'blue'*/
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ],
          redirect_urls: {
            return_url: 'https://studybuddyshop.com/myCourses',
            cancel_url: 'https://studybuddyshop.com'
          }
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        var DateObj = new Date();

        let date1 = DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);
        console.log("Again : id : " + this.course_id + "  && user_name : " + this.user_name);
        this.cus.addCourseUserNested(this.user_id, this.user_name, this.course_id, this.course_title,
                                      date1, this.videos);
        console.log("date is " + date1);
        console.log("data saved!!!");
        
        //save the details in the DB

        this.gtag.event( 'purchase', 
        {
          event_label: this.course_title,
          "transaction_id": this.user_id + ":" + date1,
          "affiliation": this.course_title,
          "value": 10,
          "currency": "USD",
          "items": [
            {
              "id": this.course_id,
              "name": this.course_title,
              "price": 10
            }
          ]
       });

      //  alert("Payment Successful");
      this.router.navigate(['/myCourses'],);

      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
