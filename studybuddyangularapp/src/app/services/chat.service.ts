import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  uri="";
  chatuti="";

  constructor(private http: HttpClient) { 
    this.uri = GlobalVariable.BASE_API_URL + "chatuser";
    this.chatuti=GlobalVariable.BASE_API_URL + "chat";
  }

  
  getOtherUsers(user_name) {
    return this
         .http
         .get(`${this.uri}/getOtherThan/${user_name}`);
  }

  getAllChat(key) {
    return this
         .http
         .get(`${this.chatuti}/getbyKey/${key}`);
  }

  saveChat(obj) {
    this.http.post(`${this.chatuti}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
