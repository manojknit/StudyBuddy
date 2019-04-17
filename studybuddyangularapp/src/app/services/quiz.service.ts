import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
    uri = 'http://localhost:4000/quiz';

  constructor(private http: HttpClient) { }
  addQuestion(question, option1, option2, option3,option4,correct_ans) {
    const obj = {
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      correct_ans: correct_ans
    };
    console.log(obj);
    this.http.post(`${this.uri}/addQuestion`, obj)
        .subscribe(res => console.log('Done'));
  }
  getQuestions(courseId) {
    return this
           .http
           .get(`${this.uri}/getquizbycourseid/${courseId}`);
  }

  addQuiz(courseid, filename, jsonObj) {
    //courseid = '5c9f12cc456fe90901ac7418';
   // const csv = require('csvtojson');
    const obj = {
      CourseId: courseid,
      quizFileName: filename,
      quizObject: jsonObj
    };
    console.log(obj);
    this.http.post(`${this.uri}/addQuiz`, obj)
        .subscribe(res => console.log('Done'));
  }
  submitQuiz(courseId, quizId, correct_ans, selected_ans) {
   let scores = 0;
    // need quiz id, coursie, correct ans array, and selected ans
    // update the quiz results table with user id , course id, quiz id, score , max score , attempts ,best score
   for (let i = 0; i < correct_ans.length; i++) {
        console.log(correct_ans[i]);
        console.log("selected " + selected_ans[i]);
        if(correct_ans[i] === selected_ans[i]) {
            scores = scores + 10;
        }
    }
   console.log('score is ' + scores);
   /* 
    CourseId: String;
    QuizId: String;
    QuizName: String;
    Score: String;
    maxScore: String;
    bestScore: String;
    attempts: String;
   */
   const quizResults = {
        CourseId: courseId,
        QuizId: 'ff',
        QuizName: 'q1',
        Score: scores,
        maxScore: '50',
        bestScore: '20',
        attempts: '1'
        
      };
      console.log('object ' + quizResults )
   this.http.post(`${this.uri}/submitQuiz`, quizResults).subscribe(res => console.log('Done'));
  
    }

}