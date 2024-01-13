import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IComment } from '../interfaces/TableInterfaces/IComment';
import { ICreateCommentDto } from '../interfaces/Dto/ICreateCommentDto';
import { ICommentInteractions } from '../interfaces/MiscInterfaces/ICommentInteractions';
import { ICommentReply } from '../interfaces/TableInterfaces/ICommentReply';
import { ICreateCommentReplyDto } from '../interfaces/Dto/ICreateCommentReplyDto';
import { ICommentReplyInteractions } from '../interfaces/MiscInterfaces/ICommentReplyInteractions';
import { IUpdateCommentDto } from '../interfaces/Dto/IUpdateCommentDto';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  // CRUD OPERATIONS
  // Comment Methods
  // GET
  getOneComment(id: number): Observable<IComment>{
    return this.http.get<IComment>(environment.baseUrl + `Comment/getOne${id}`);
  }

  getAllComments(): Observable<IComment[]>{
    return this.http.get<IComment[]>(environment.baseUrl + `Comment/getAll`);
  }

  getCommentInteractions(id: number): Observable<ICommentInteractions>{
    return this.http.get<ICommentInteractions>(environment.baseUrl + `Comment/getInteractions${id}`);
  }

  getCommentReplies(id: number): Observable<ICommentReply[]>{
    return this.http.get<ICommentReply[]>(environment.baseUrl + `Comment/getReplies${id}`);
  }

  // OTHER
  postComment(comment: ICreateCommentDto): Observable<boolean>{
    const url = environment.baseUrl + `Comment/createComment`;

    return this.http.post(url, comment, { responseType: 'text' }).pipe(
      map(data => { return data != null })
    );
  }

  putComment(comment: IUpdateCommentDto): Observable<boolean>{
    const url = environment.baseUrl + `Comment/updateComment`;

    return this.http.put(url, comment, { responseType: 'text' }).pipe(
      map(data => { return data != null })
    );
  }

  deleteComment(id: number): Observable<boolean>{
    const url = environment.baseUrl + `Comment/deleteComment${id}`;

    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(data => { return data != null })
    );
  }

  // Reply Methods
  // GET
  getOneCommentReply(id: number): Observable<ICommentReply>{
    return this.http.get<ICommentReply>(environment.baseUrl + `CommentReply/getOne${id}`);
  }

  getAllCommentReplies(): Observable<ICommentReply[]>{
    return this.http.get<ICommentReply[]>(environment.baseUrl + `CommentReply/getAll`);
  }

  getCommentReplyInteractions(id: number): Observable<ICommentReplyInteractions>{
    return this.http.get<ICommentReplyInteractions>(environment.baseUrl + `CommentReply/getInteractions${id}`);
  }

  // OTHER
  postCommentReply(reply: ICreateCommentReplyDto): Observable<boolean>{
    const url = environment.baseUrl + `CommentReply/createCommentReply`;

    return this.http.post(url, reply, { responseType: 'text' }).pipe(
      map(data => { return data != null })
    );
  }

  putCommentReply(reply: IUpdateCommentDto): Observable<boolean>{
    const url = environment.baseUrl + `CommentReply/updateCommentReply`;

    return this.http.put(url, reply, { responseType: 'text' }).pipe(
      map(data => { return data != null })
    );
  }

  deleteCommentReply(id: number): Observable<boolean>{
    const url = environment.baseUrl + `CommentReply/deleteComment${id}`;

    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(data => { return data != null })
    );
  }

  // MISC Methods
}
