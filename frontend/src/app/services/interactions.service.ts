import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  user_id: number;
  sortObj: Object;

  private threadEdit = new BehaviorSubject<boolean>(false);
  private commentEdit = new BehaviorSubject<boolean>(false);
  private replyEdit = new BehaviorSubject<boolean>(false);

  constructor() {
    this.sortObj = {type: 'date', order: "desc"};
  }

  getSort(){
    return this.sortObj;
  }
  setSort(obj: Object){
    this.sortObj = obj;
  }

  // THREAD INTERACTIONS
  setThreadEdit(value: boolean) {
    this.threadEdit.next(value);
  }
  getThreadEdit(): Observable<boolean>{
    return this.threadEdit.asObservable();
  }

  // COMMENT INTERACTIONS
  setCommentEdit(value: boolean) {
    this.commentEdit.next(value);
  }
  getCommentEdit(): Observable<boolean>{
    return this.commentEdit.asObservable();
  }

  // REPLY INTERACTIONS
  setReplyEdit(value: boolean) {
    this.replyEdit.next(value);
  }
  getReplyEdit(): Observable<boolean>{
    return this.replyEdit.asObservable();
  }

}
