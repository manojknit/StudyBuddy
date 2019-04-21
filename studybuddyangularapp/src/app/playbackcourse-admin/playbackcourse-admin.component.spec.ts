import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackcourseAdminComponent } from './playbackcourse-admin.component';

describe('PlaybackcourseAdminComponent', () => {
  let component: PlaybackcourseAdminComponent;
  let fixture: ComponentFixture<PlaybackcourseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackcourseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackcourseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
