import { Component, OnInit } from '@angular/core';
import {LeaderboardService} from '../services/leaderboard.service';
import Leaderboard from '../Leaderboard';
import { LEAVE_SELECTOR } from '@angular/animations/browser/src/util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboards: Leaderboard[];
  leaderboard_temp:Leaderboard[] = new Array(); 
  userTotalProgress: number;
  userRank: number;
  userLevel: number;
  userVelocity: any;
  user_name: String = "";
  userid: String;
  isAdmin: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router, private bs: LeaderboardService) { 
      let user = JSON.parse(localStorage.getItem("user")); 
      this.userid = user.email;
      this.user_name = user.name.username;
      console.log("LB Constructor: " +  this.user_name + " : " +this.userid);

      if ( this.userid == 'shalini.narang@sjsu.edu' || this.userid.indexOf("admin")>0 || this.userid == 'erpatel@gmail.com' ||
                        this.userid == 'studybuddy.auser@gmail.com' ||  this.userid.indexOf("auser")>0 )  //Set Admin
      {
        this.isAdmin = true;
      }
      else
      { 
        this.isAdmin = false;
      }
    }

  ngOnInit() {
    this.bs
    .getUserVelocityList()
    .subscribe((data: Leaderboard[]) => {
      this.leaderboards = data;    

      for (var i = 0; i < this.leaderboards.length; i++)
      {
        if (this.leaderboards[i].max_video_date != null){
          this.leaderboard_temp.push(this.leaderboards[i]);
        }
      }
      this.sortLeaderBoard();
  });

  }
  
    sortLeaderBoard(){
      let maxIndex:number;
      let leader: Leaderboard;
      let iVel:number;
      let jVel:number;

      console.log("Learning LeaderBoard Length: " + this.leaderboard_temp.length);

      for (var i = 0; i < this.leaderboard_temp.length; i++)
      {
        maxIndex = i;
        // iVel = this.getVelocity(this.leaderboard_temp[i]["_id"].user_name, this.leaderboard_temp[i]["_id"].started_on, this.leaderboard_temp[i].max_video_date, this.leaderboard_temp[i].totalProgress);
        iVel = this.getLeaderVelocity(this.leaderboard_temp[i]);

        let temp:Leaderboard;

        for (var j = i+1; j < this.leaderboard_temp.length; j++)
        {
          // jVel = this.getVelocity(this.leaderboard_temp[j]["_id"].user_name, this.leaderboard_temp[j]["_id"].started_on, this.leaderboard_temp[j].max_video_date, this.leaderboard_temp[j].totalProgress);
          jVel = this.getLeaderVelocity(this.leaderboard_temp[j]);
          if (+jVel > +iVel){
            maxIndex = j;
            // console.log("jVel > iVel: " + i + " : "+ j + " : "+ iVel + " : " + jVel + " : " + "maxIndex : " + maxIndex);
            iVel = jVel;
            temp = this.leaderboard_temp[i];
            this.leaderboard_temp[i] = this.leaderboard_temp[j];
            this.leaderboard_temp[j] = temp;
          }   
        }
        leader = this.leaderboard_temp[i];  
        this.leaderboard_sort.push(leader);
      }
      this.leaderboards = this.leaderboard_sort;
  }

  getLeaderVelocity(uleader: Leaderboard){
    let user_name = uleader["_id"].user_name;
    let started_on = uleader["_id"].started_on; 
    let max_video_date = uleader.max_video_date; 
    let totalProgress:Number = uleader.totalProgress;

    // console.log("getLeaderVelocity : " + "user_name: " + user_name +
    // " started_on: " + started_on + 
    // " max_video_date: " + max_video_date + 
    // " totalProgress: " + totalProgress);

    let diff = (new Date(max_video_date).getTime() - new Date(started_on).getTime())/(24 * 60 * 60 * 1000);
    let days = 0;

    if (diff == 0){
      days = 1;
    } else {
      days = diff;
    };
        
    let velocity: any = totalProgress.valueOf()/(days); // velocity in min per day
    // console.log("Learning Velocity: " +  velocity * 100);

    velocity = velocity.toFixed(2);

    if (user_name == this.user_name){
      this.userVelocity = velocity;
      this.userTotalProgress = totalProgress.valueOf();
    }
    return velocity;
  }


  getVelocity(user_name,started_on, max_video_date, totalProgress){
    let diff = (new Date(max_video_date).getTime() - new Date(started_on).getTime())/(24 * 60 * 60 * 1000);
    let days = 0;

    if (diff == 0){
      days = 1;
    } else {
      days = diff;
    };
        
    let velocity: any = totalProgress/(days); // velocity in min per day
    // console.log("Learning Velocity: " +  velocity * 100);

    velocity = velocity.toFixed(2);

    if (user_name == this.user_name){
      this.userVelocity = velocity;
      this.userTotalProgress = totalProgress;
    }
    return velocity;
  }

  getUser(){
    // let user = JSON.parse(localStorage.getItem("user")); 
    // console.log("User: " +  user);
    return this.user_name;
  }

  getTotalProgress(){
    return (this.userTotalProgress).toFixed(2);
  }

  getUserVelocity(){
    return this.userVelocity;
  }

  //Relative rank in the ordered set of Learning Velocity
  getRank(){
    let vel:number[];

    for (var i = 0; i < this.leaderboards.length; i++)
      {
        let v = this.getVelocity(
            this.leaderboards[i]["_id"].user_name,
            this.leaderboards[i]["_id"].started_on, 
            this.leaderboards[i].max_video_date, 
            this.leaderboards[i].totalProgress);
        if (this.userVelocity == v){
          this.userRank = i+1;
        }
      }
    console.log("User Rank: " +  this.userRank);
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
