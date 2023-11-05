import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IComment } from '../user/IComment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getAllComments() : Observable<IComment[]>{
    return this.http.get('data/comments.json').pipe(
      map(data => {
        const commentsArray: Array<IComment> = [];
        for(const id in data){
          if(data.hasOwnProperty(id)){
            commentsArray.push(data[id]);
          }
        }
        return commentsArray;
      })
    );
  }
}
