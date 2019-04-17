import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  quizForm: FormGroup;
 

  constructor(private fb: FormBuilder, private qs: QuizService) {
    this.createForm();
   }

  createForm() {
    this.quizForm = this.fb.group({
      question: ['', Validators.required ],
      option1: ['', Validators.required ],
      option2: ['', Validators.required ],
      option3: ['', Validators.required ],
      option4: ['', Validators.required ],
      correct_ans: ['', Validators.required ]
    });
  }
  addQuestion(question, option1, option2, option3, option4, correct_ans) {
    this.qs.addQuestion(question, option1, option2, option3, option4, correct_ans);
  }

  ngOnInit() {
  }

}
