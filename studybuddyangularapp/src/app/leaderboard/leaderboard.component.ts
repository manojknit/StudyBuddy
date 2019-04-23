import { Component, OnInit } from '@angular/core';
import {LeaderboardService} from '../services/leaderboard.service';
import Leaderboard from '../Leaderboard';
import { LEAVE_SELECTOR } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboards: Leaderboard[];
  userTotalProgress: number;
  userRank: number;
  userLevel: number;
  userVelocity: any;
  user_name: String = "ssn1";

  constructor(private bs: LeaderboardService) { }

  ngOnInit() {
    this.bs
    .getUserVelocityList()
    .subscribe((data: Leaderboard[]) => {
      this.leaderboards = data;
    
      console.log("LeaderboardComponent " + this.leaderboards[0]["_id"].user_name);
      console.log("LeaderboardComponent " + this.leaderboards[0].totalProgress);
      console.log("json obj" +  JSON.stringify(this.leaderboards));
  });

  }

  getVelocity(user_name,started_on, max_video_date, totalProgress){
    let diff = (new Date(max_video_date).getTime() - new Date(started_on).getTime())/(24 * 60 * 60 * 1000);
    let days = 0;

    if (diff == 0){
      days = 1;
    } else {
      days = diff;
    };
        
    let velocity: any = 100*totalProgress/(days*60); // velocity in min per day
    // console.log("Learning Velocity: " +  velocity * 100);

    velocity = velocity.toFixed(2);

    if (user_name == this.user_name){
      this.userVelocity = velocity;
      this.userTotalProgress = totalProgress;
    }
    return velocity;
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem("user")); 
    console.log("User: " +  user);
    return this.user_name;
  }

  getTotalProgress(){
    return this.userTotalProgress.toFixed(2);
  }

  getUserVelocity(){
    return this.userVelocity;
  }

  //Relative rank in the ordered set of Learning Velocity
  getRank(){
    return this.userRank;
  }

  // 5 Levels depending on user's learning velocity
  // Level 1: 20 min/day; Level 2: 30 min/day; Level 3: 40 min/day; Level 4: 50 min/day; Level 5: 60 min/day; 
  getLevel(){
    if (this.userVelocity <= 20 && this.userVelocity >0){
      this.userLevel = 1;
    } else if (this.userVelocity <= 30  && this.userVelocity >20){
      this.userLevel = 2;
    } else if (this.userVelocity <= 40  && this.userVelocity >30){
      this.userLevel = 3;
    } else if (this.userVelocity <= 50 && this.userVelocity >40){
      this.userLevel = 4;
    } else if (this.userVelocity > 50){
      this.userLevel = 5;
    }
    return this.userLevel;
  }

}
