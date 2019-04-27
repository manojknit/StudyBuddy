import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizComponent } from './add-quiz.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddQuizComponent', () => {
  let component: AddQuizComponent;
  let fixture: ComponentFixture<AddQuizComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuizComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule         
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
