import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatCommonModule, MatCardModule, MatListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadcourseComponent } from './uploadcourse/uploadcourse.component';
import { PlaybackcourseComponent } from './playbackcourse/playbackcourse.component';
import { CourseGetComponent } from './course-get/course-get.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseService } from './services/course.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UploadcourseComponent,
    PlaybackcourseComponent,
    CourseGetComponent,
    CourseAddComponent,
    CourseEditComponent
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
    MatListModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
