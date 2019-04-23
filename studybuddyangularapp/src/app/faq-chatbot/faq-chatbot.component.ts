import { Component, OnInit } from '@angular/core';
import {LexRuntime} from 'aws-sdk';
import {Message} from '../messages';
import { GlobalVariable } from '../../app.global';
@Component({
  selector: 'app-faq-chatbot',
  templateUrl: './faq-chatbot.component.html',
  styleUrls: ['./faq-chatbot.component.css']
})
export class FaqChatbotComponent implements OnInit {

  constructor() { }

  lex: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse: string ="Hi Buddy, How can i help you?";
  username: string = "";
  botname: string ="Buddybot"
  today: number = Date.now();
  ngOnInit() {
    this.messages.push(new Message(this.lexResponse,this.botname));
  }

  postLexText() {
    var params = {
      botAlias: '\$LATEST', /* required */
      botName: 'StudyBuddyBot', /* required */
      inputText: 'How do i make payment', /* required */
      userId: 'studybuddy', /* required */
      // requestAttributes: {
      //   '<String>': 'STRING_VALUE',
      //   /* '<String>': ... */
      // },
      // sessionAttributes: {
      //   '<String>': 'STRING_VALUE',
      //   /* '<String>': ... */
      // }
    };

    this.lex = new LexRuntime({
      accessKeyId: GlobalVariable.ACCESS_ID,
      secretAccessKey: GlobalVariable.SECRET ,
      region: "us-east-1"
    }
    );
    params.inputText= this.userInput;
    this.lex.postText(params, (err, data)=>{
      if (err){
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log(data) // successful response
        this.lexResponse = data.message;
      }
      let user = JSON.parse(localStorage.getItem("user")); 
      this.username = user.name.username;
      this.messages.push(new Message(this.userInput, this.username));
        this.userInput="";
      this.messages.push(new Message(this.lexResponse,this.botname));
    });
  }

}
