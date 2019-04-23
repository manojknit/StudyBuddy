import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatCommonModule, MatCardModule, MatListModule, MatProgressBarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadcourseComponent } from './uploadcourse/uploadcourse.component';
import { PlaybackcourseComponent } from './playbackcourse/playbackcourse.component';
import { CourseGetComponent } from './course-get/course-get.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseService } from './services/course.service';
import { QuizService } from './services/quiz.service';
import { LeaderboardService } from './services/leaderboard.service';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseMybucketComponent } from './course-mybucket/course-mybucket.component';
import { CourseBuyComponent } from './course-buy/course-buy.component';

import { CustomReuseStrategy } from './app.customreusestrategy';
import { RouteReuseStrategy } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CSV2JSONModule } from 'angular2-csv2json';
import { MatRadioModule } from '@angular/material';
import { GtagModule } from 'angular-gtag';
import { PlaybackcourseAdminComponent } from './playbackcourse-admin/playbackcourse-admin.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadcourseComponent,
    PlaybackcourseComponent,
    CourseGetComponent,
    CourseAddComponent,
    CourseEditComponent,
    HomeComponent,
    CourseDetailComponent,
    CourseMybucketComponent,
    CourseBuyComponent,
    LeaderboardComponent,
    TakeQuizComponent,
    AddQuizComponent,
    PlaybackcourseAdminComponent,
    ChatComponent
  ],
  imports: [
    SlimLoadingBarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCommonModule,
    MatCardModule,
    MatListModule,
    AmplifyAngularModule,
    CSV2JSONModule,
    MatRadioModule,
    MatProgressBarModule,
    AmplifyAngularModule,
    GtagModule.forRoot({ trackingId: 'UA-138249129-1', trackPageviews: true, debug: true })
  ],
  providers: [LeaderboardService, CourseService, AmplifyService, QuizService, { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
