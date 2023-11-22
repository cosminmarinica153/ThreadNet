import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IComment } from '../interfaces/IComment';
import { UserService } from './user.service';
import { IComment_Reply } from '../interfaces/IComment_Reply';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  addComment(comment: IComment){
    let comments = [];
    if(localStorage.getItem('Comments')){
      comments = JSON.parse(localStorage.getItem('Comments'));
      comments = [...comments, comment];
    }
    else{
      comments = [comment];
    }
    localStorage.setItem('Comments', JSON.stringify(comments));
  }

  addReply(reply: IComment_Reply){
    let replies = [];
    if(localStorage.getItem('Comment_Replies')){
      replies = JSON.parse(localStorage.getItem('Comment_Replies'));
      replies = [...replies, reply];
    }
    else{
      replies = [reply];
    }
    localStorage.setItem('Comment_Replies', JSON.stringify(replies));
  }

  getCommentLastId(): number{
    let comments = JSON.parse(localStorage.getItem('Comments'));
    return +comments.length + 1;
  }

  getReplyLastId() : number{
    let replies = JSON.parse(localStorage.getItem("Comment_Replies"));
    return +replies.length + 1;
  }


  getAllComments(thread_id: number) : IComment[]{
    const commentsArray: Array<IComment> = [];
    JSON.parse(localStorage.getItem('Comments')).forEach((comment: IComment) => {
      if(comment.thread_id === thread_id)
        commentsArray.push(comment);
    });
    return commentsArray;
  }

  getDiscussionParticipants(thread_id: number): string[]{
    let comments = this.getAllComments(thread_id);
    let participants: string[];
    comments.forEach(comment => {
      const username = this.userService.getUsernameById(comment.user_id);
      participants.push(username);
    })
    return participants; 
  }
}
