import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  postComment(comment: ICreateCommentDto): boolean{
    return Boolean(this.http.post<ICreateCommentDto>(environment.baseUrl + `Comment/createComment`, comment));
  }

  putComment(comment: IUpdateCommentDto): boolean{
    return Boolean(this.http.put<IUpdateCommentDto>(environment.baseUrl + `Comment/updateComment`, comment));
  }

  deleteComment(id: number): boolean{
    return Boolean(this.http.delete<number>(environment.baseUrl + `Comment/deleteComment${id}`));
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
  postCommentReply(reply: ICreateCommentReplyDto): boolean{
    return Boolean(this.http.post<ICreateCommentReplyDto>(environment.baseUrl + `CommentReply/createCommentReply`, reply));
  }

  putCommentReply(reply: IUpdateCommentDto): boolean{
    return Boolean(this.http.put<IUpdateCommentDto>(environment.baseUrl + `CommentReply/updateCommentReply`, reply));
  }

  deleteCommentReply(id: number): boolean{
    return Boolean(this.http.delete<number>(environment.baseUrl + `CommentReply/deleteComment${id}`));
  }

  // MISC Methods
}
