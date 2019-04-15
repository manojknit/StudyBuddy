import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseMybucketService {

  uri = 'http://localhost:4000/courseusernested';

  constructor(private http: HttpClient) { }

  getByUserId(id) {
    return this
            .http
            .get(`${this.uri}/getbyuserid/${id}`);
  }
}
