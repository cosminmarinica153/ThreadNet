import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IComment } from '../interfaces/IComment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllComments(thread_id: number) : Observable<IComment[]>{
    return this.http.get('data/comments.json').pipe(
      map(data => {
        const commentsArray: Array<IComment> = [];
        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].thread_id === thread_id){
            commentsArray.push(data[id]);
          }
        }
        return commentsArray;
      })
    );
  }

  getDiscussionParticipants(thread_id: number): Observable<string[]>{
    return this.http.get('data/comments.json').pipe(
      map(data => {
        const userArray: Array<string> = [];
        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].thread_id === thread_id){
            this.userService.getUsernameById(data[id].user_id).subscribe(
              username => {
                userArray.push(username);
              }
            )
          }
        }
        return userArray;
      })
    )
  }
}
