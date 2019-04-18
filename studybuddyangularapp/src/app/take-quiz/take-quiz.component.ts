import { Component, OnInit } from '@angular/core';
import Quiz from '../Quiz';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {Location} from '@angular/common';
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
  scores = -1;
  selectedcourseid: string = "";
  quizid: string = "";


  
  //constructor(private qs: QuizService) { }
  constructor(private fb: FormBuilder, private qs: QuizService, private route: ActivatedRoute, private router: Router, private _location: Location) {
    this.createquizForm();
    
  }

  createquizForm() {
    this.quizForm = this.fb.group({  
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.selectedcourseid = params['id'];
    this.quizid = params['quizid'];
    console.log("selected course id " + this.selectedcourseid + "  selected quiz id " + this.quizid);
  });
    this.qs.getQuestions(this.selectedcourseid).subscribe((data: Quiz[]) => {
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
//submitQuiz(courseId, quizId, correct_ans, selected_ans)
  submitQuiz() {
    console.log('submitting quiz');
    this.scores = this.qs.submitQuiz(this.selectedcourseid, this.quizid, this.Correct_Ans_array, this.selectedAnswers);
    console.log('scores from ' + this.scores);
  }
  backClicked() {
    this._location.back();
  }
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
