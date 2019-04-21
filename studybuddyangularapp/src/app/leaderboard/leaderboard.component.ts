import { Component, OnInit } from '@angular/core';
import {LeaderboardService} from '../services/leaderboard.service';
import Leaderboard from '../Leaderboard';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboards: Leaderboard[];

  constructor(private bs: LeaderboardService) { }

  ngOnInit() {
    this.bs
    .getUserVelocityList()
    .subscribe((data: Leaderboard[]) => {
      this.leaderboards = data;
  });

  }

  getUserVelocityList(){
    this.bs.getUserVelocityList();
    console.log("in getUserVelocityList()");
  }

}
