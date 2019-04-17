import { Component, OnInit } from '@angular/core';
import Quiz from '../Quiz';
import { QuizService } from '../services/quiz.service';
import {MatRadioModule} from '@angular/material/radio';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
quizForm: FormGroup;
quizzes: Quiz['quizObject'];
 //Correct_ans_array: [];
  Correct_Ans_array: String [] = [];
  selection: String [] = [];
  selectedAnswers = [];
  scores = 0;


  
  //constructor(private qs: QuizService) { }
  constructor(private fb: FormBuilder, private qs: QuizService) {
    this.createquizForm();
    
  }

  createquizForm() {
    this.quizForm = this.fb.group({  
    });
  }

  ngOnInit() {
    this.qs.getQuestions('5c9f12cc456fe90901ac7418').subscribe((data: Quiz[]) => {
      console.log("quizzes " + this.quizzes);
      this.quizzes = data[0].quizObject;
     // this.Correct_Ans_array.push(data[0].quizObject[0].correct_ans); 
     // data[0].
      console.log("quiz " + this.quizzes);
      this.quizzes.forEach(element => {
        this.Correct_Ans_array.push(element.correct_ans);
     });
      });
      
  }
  submitQuiz() {
    console.log('submitting quiz');
    this.qs.submitQuiz('5c9f12cc456fe90901ac7418', 'fdf', this.Correct_Ans_array, this.selectedAnswers);

   // console.log(this.quizzes[0].option1);
   /* for (let i = 0; i < this.quizzes.length; i++) {
      console.log(this.quizzes[i].correct_ans);
    this.Correct_Ans_array.push(this.quizzes[i].correct_ans);
    } */
    
 /*  for (let i = 0; i < this.Correct_Ans_array.length; i++) {
      console.log(this.Correct_Ans_array[i]);
      console.log("selected " + this.selectedAnswers[i]);
      if(this.Correct_Ans_array[i] == this.selectedAnswers[i]) {
        this.scores = this.scores + 10;
      }
      console.log(this.scores);
    }   */
  }
/*
  this.vs
      .getVideos(params['id'])
      .subscribe((data: Video[]) => {
        //data.forEach(function (value) {
          //items.add
         // console.log(Array.of(value));
        //}); 
        this.videos = data;
        if(data[0] != undefined && data[0] != null && this.selectedvideo == null)
        {
          let filename = data[0].VideoTitle;
          this.selectedvideo = filename.slice(0, filename.lastIndexOf( '.' ));
        }
    });
*/

}
