import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseGetComponent } from './course-get/course-get.component';
import { UploadcourseComponent } from './uploadcourse/uploadcourse.component';
import { PlaybackcourseComponent } from './playbackcourse/playbackcourse.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/course',
    pathMatch: 'full'
  },
  {
    path: 'course/create',
    component: CourseAddComponent
  },
  {
    path: 'course/edit/:id',
    component: CourseEditComponent
  },
  {
    path: 'course',
    component: CourseGetComponent
  },
  {
    path: 'course/upload/:id',
    component: UploadcourseComponent
  },
  {
    path: 'course/video/:id',
    component: PlaybackcourseComponent
  },
  {
    path: 'course/video/:id/play/:videoid',
    component: PlaybackcourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

