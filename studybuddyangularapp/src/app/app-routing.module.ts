import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseGetComponent } from './course-get/course-get.component';
import { UploadcourseComponent } from './uploadcourse/uploadcourse.component';
import { PlaybackcourseComponent } from './playbackcourse/playbackcourse.component';
import { HomeComponent } from './home/home.component';
import { CourseDetailComponent} from './course-detail/course-detail.component';
import { CourseMybucketComponent} from './course-mybucket/course-mybucket.component';


const routes: Routes = [
<<<<<<< HEAD
  {
    path: '',
    redirectTo: '/course',
    pathMatch: 'full'
=======
  { path: '',  
    component: HomeComponent, 
    pathMatch: 'full' 
  },
  { path: 'courseDetail/:id',  
    component: CourseDetailComponent
  },
  { path: 'courseBucket/',  
    component: CourseMybucketComponent
>>>>>>> 1f36a99e24a01a822c087b096e323005045d6d0a
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

