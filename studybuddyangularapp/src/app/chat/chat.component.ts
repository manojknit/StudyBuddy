import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import ChatUser  from '../ChatUser';
import Chat from '../Chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user_id: string;
  user_name: String;
  chatUser: ChatUser[];
  chat: Chat[];
  key: String;
  receiver: String;
  message: String;

  constructor(private cs : ChatService) { 
    let user = JSON.parse(localStorage.getItem("user")); 
    this.user_id = user.email;
    this.user_name = user.name.username;
  }

  ngOnInit() {
    this.cs
    .getOtherUsers(this.user_name)
    .subscribe((data: ChatUser[]) => {
      this.chatUser = data;

      console.log("users are " + this.chatUser[0].user_name);
    });

    
  }

  isSameUser(user_name) {
    return this.user_name == user_name;
  }

  loadChat(user_name) {
    console.log("User name"  + user_name);
    let key= this.getKey(user_name, this.user_name);
    this.key = key;
    this.receiver = user_name;

    console.log("key " + key);

    this.cs
    .getAllChat(key)
    .subscribe((data: Chat[]) => {
      this.chat = data;

      // console.log("users are " + this.chat[0].key);
    });

  }

  getKey( name1, name2) {
    let key=name1+":"+name2;

    if(name1 > name2) 
      key = name2+":"+ name1;

    return key;
  }

  saveChat() {
    console.log("text has " + this.message);
    let chat1 = new Chat;
    chat1.key = this.key;
    chat1.message = this.message;
    chat1.sender = this.user_name;
    chat1.receiver = this.receiver;
    chat1.date= new Date();

    this.cs.saveChat(chat1);
  }
}