import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatCommonModule, MatCardModule, MatListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadcourseComponent } from './uploadcourse/uploadcourse.component';
import { PlaybackcourseComponent } from './playbackcourse/playbackcourse.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadcourseComponent,
    PlaybackcourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
