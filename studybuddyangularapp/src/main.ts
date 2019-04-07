import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify, {Auth} from 'aws-amplify';
import amplify from './aws-exports.js';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//Auth Set up
Amplify.configure(amplify);
const oauth1 = {
  // Domain name
  domain : 'studybuddy.auth.us-east-1.amazoncognito.com',

  // Authorized scopes
  scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 

  // Callback URL
  redirectSignIn : 'http://localhost:4200', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

  // Sign out URL
  redirectSignOut : 'http://localhost:4200', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

  // 'code' for Authorization code grant,
  // 'token' for Implicit grant
  responseType: 'code',

  // optional, for Cognito hosted ui specified options
  options: {
      // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
      AdvancedSecurityDataCollectionFlag : false
  }
};

Auth.configure({oauth: oauth1});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
