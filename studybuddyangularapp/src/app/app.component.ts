import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import * as $ from 'jquery';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Study Buddy';
  signedIn: boolean;
  user: any;
  greeting: string;
  useremail: any;

  constructor(private _loadingBar: SlimLoadingBarService, private amplifyService: AmplifyService, private _router: Router) {
    console.log('App Component');
    this.amplifyService.authStateChange$
            .subscribe(authState => {
                this.signedIn = authState.state === 'signedIn';
                if (!authState.user) {
                    this.user = null;
                    this.useremail = null;
                } else {
                    this.user = authState.user;
                    this.useremail = this.user.attributes.email;
                    console.log('Greeting=' + this.greeting + 'email=' + this.useremail);
                }
        });
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  //ngOnInit() {$('body').addClass('df');}

    onLoginClick() {
      const URL = 'https://studybuddy.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=3ka7920q49t5u0thkp189u5dma&redirect_uri=http://localhost:4200';
      window.location.assign(URL);

    }
}
