import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqChatbotComponent } from './faq-chatbot.component';

describe('FaqChatbotComponent', () => {
  let component: FaqChatbotComponent;
  let fixture: ComponentFixture<FaqChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqChatbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
