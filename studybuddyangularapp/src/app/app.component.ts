import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import * as $ from 'jquery';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy  {
  title = 'Study Buddy';
  signedIn: boolean;
  isAdmin: boolean;
  user: any;
  role: any;
  greeting: string;
  useremail: any;
  Auth1: AmplifyService;

  constructor(private loadingBar: SlimLoadingBarService, private amplifyService: AmplifyService, 
    private _router: Router, gtag: Gtag) {
    
    this.loadingBar.start();
    this.isAdmin = false;
    this.Auth1 = amplifyService;
  //   this.Auth1.auth().currentAuthenticatedUser()
  // .then(data => console.log('data' + JSON.stringify(data)))
  // .catch(err => console.log(err));

    this.Auth1.auth().currentAuthenticatedUser({
    bypassCache: true  }).then(user => console.log('data' + JSON.stringify(user.attributes.email)))
    .catch(err => console.log(err));

    // this._router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // console.log("start12");
    //     (<any>window).gtag('set', 'page', event.urlAfterRedirects);
    //     (<any>window).gtag('send', 'pageview');
       
    //     // console.log("start13");
    //   }
    // });

    gtag.event('init', { event_label: 'App Init'});

    console.log('App Component');
    this.Auth1.authStateChange$
            .subscribe(authState => {
                this.signedIn = authState.state === 'signedIn';
                if (!authState.user) {
                    localStorage.clear();
                    this.user = null;
                    this.useremail = null;
                } else {
                    this.user = authState.user;
                    this.useremail = this.user.attributes.email;
                    console.log('Greeting=' + this.greeting + 'email=' + this.useremail);
                    // Set item:
                    if ( this.useremail == 'erpatel@gmail.com')  //Set Admin
                    {
                      this.role = 'admin';
                      this.isAdmin = true;
                    }
                    else
                    { 
                      this.role = 'user';
                      this.isAdmin = false;
                    }
                    let myObj = { name: this.user , email: this.useremail, role: this.role };
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(myObj));
                    //let item = JSON.parse(localStorage.getItem(key)); //in ngOnInit() 
                }
                this.loadingBar.complete();
        });
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }

  ngOnInit() {
    //$('body').addClass('df');
    console.log('oninit' + this.role );
  }

  ngOnDestroy() {
    localStorage.removeItem('user'); // localStorage.clear();
  }
  onLoginClick() {
      const URL = 'https://studybuddy.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=3ka7920q49t5u0thkp189u5dma&redirect_uri=http://localhost:4200';
      window.location.assign(URL);
  }
}
