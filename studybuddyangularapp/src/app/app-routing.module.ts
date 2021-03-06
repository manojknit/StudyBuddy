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
import { CourseBuyComponent} from './course-buy/course-buy.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { PlaybackcourseAdminComponent } from './playbackcourse-admin/playbackcourse-admin.component';
import { ChatComponent } from './chat/chat.component';
import { FaqChatbotComponent } from './faq-chatbot/faq-chatbot.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: 'index',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: 'courseDetail/:id',
    component: CourseDetailComponent
  },
  { path: 'myCourses',
    component: CourseMybucketComponent
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
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'course/video/:id/takequiz/:quizid',
   // path: 'quiz/takeQuiz',
    component: TakeQuizComponent
  },
  {
    path: 'course/addquiz/:id',
    component: AddQuizComponent
  },
  {
    path: 'course/admin/:id',
    component: PlaybackcourseAdminComponent

  },
  {
    path: 'course/admin/:id/play/:videoid',
    component: PlaybackcourseAdminComponent

  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'faq/chatbot',
    component: FaqChatbotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

