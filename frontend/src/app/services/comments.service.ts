import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IComment } from '../interfaces/IComment';
import { UserService } from './user.service';
import { IComment_Reply } from '../interfaces/IComment_Reply';
import { Router } from '@angular/router';
import { InteractionsService } from './interactions.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private router: Router, private http: HttpClient,
              private userService: UserService, private interaction: InteractionsService) { }

  // Comment Methods
  // Create new Comment
  addComment(comment: IComment){
    let comments = [];
    if(localStorage.getItem('Comments')){
      comments = JSON.parse(localStorage.getItem('Comments'));
      comments = [...comments, comment];
    }
    else comments = [comment];
    localStorage.setItem('Comments', JSON.stringify(comments));
  }

  getAllComments(): IComment[]{
    if(!localStorage.getItem('Comments')) return [];

    return JSON.parse(localStorage.getItem('Comments'));
  }

  getCommentById(comment_id: number): IComment{
    if(!localStorage.getItem('Comments')) return null;

    return this.getAllComments().find(comment => comment.id === comment_id);
  }

  getAllCommentsForThread(thread_id: number): IComment[]{
    if(!localStorage.getItem('Comments')) return [];

    const commentsArray: Array<IComment> = [];
    this.getAllComments().forEach((comment: IComment) => {
      if(comment.thread_id === thread_id)
        commentsArray.push(comment);
    });
    return commentsArray;
  }

  getUserComments(user_id: number): IComment[]{
    if(!localStorage.getItem('Comments')) return [];

    const commentsArray: Array<IComment> = [];
    this.getAllComments().forEach((comment: IComment) => {
      if(comment.user_id === user_id)
        commentsArray.push(comment);
    });
    return commentsArray;
  }

  getCommentLastId(): number{
    let id: number = 1;
    if(!localStorage.getItem('Comments')) return id;

    const comments = this.getAllComments();
    if(comments.length === 0) return id ;

    id = comments[comments.length - 1].id + 1;
    return id;
  }

  deleteThreadComments(thread_id: number){
    this.getAllCommentsForThread(thread_id).forEach(comment => {
      this.deleteComment(comment.id);
      this.interaction.removeCommentInteractions(comment.id);
    });
  }

  deleteThreadComment(thread_id: number, comment_id: number){
    const comments = this.getAllComments();
    const index = comments.findIndex(comment => comment.id === comment_id);

    comments.splice(index, 1);

    localStorage.setItem('Comments', JSON.stringify(comments));

    this.deleteCommentReplies(comment_id);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/thread', thread_id]);
    });
  }

  deleteComment(comment_id: number){
    const comments = this.getAllComments();
    const index = comments.findIndex(comment => comment.id === comment_id);

    comments.splice(index, 1);

    localStorage.setItem('Comments', JSON.stringify(comments));

    this.deleteCommentReplies(comment_id);
  }

  editComment(newComment: IComment){
    const comments = this.getAllComments();
    const index = comments.findIndex(comment => comment.id === newComment.id);

    comments[index] = newComment;

    localStorage.setItem('Comments', JSON.stringify(comments));
  }

  likeComment(comment_id: number, add: boolean){
    const comments = this.getAllComments();
    const comment = comments.find(comment => comment.id === comment_id);

    if(add)
      comment.up_votes++;
    else
      comment.up_votes--;

    const index = comments.findIndex((comment: IComment) => comment.user_id === comment_id);

    delete comments[index];
    comments[index] = comment;

    localStorage.setItem('Comments', JSON.stringify(comments));
  }

  dislikeComment(comment_id: number, add: boolean){
    const comments = this.getAllComments();
    const comment = comments.find(comment => comment.id === comment_id);

    if(add)
      comment.down_votes++;
    else
      comment.down_votes--;

    const index = comments.findIndex((comment: IComment) => comment.user_id === comment_id);

    delete comments[index];
    comments[index] = comment;

    localStorage.setItem('Comments', JSON.stringify(comments));
  }
  
  // Reply Methods
  // Create new Reply
  addReply(reply: IComment_Reply){
    let replies = [];
    if(localStorage.getItem('Comment_Replies')){
      replies = JSON.parse(localStorage.getItem('Comment_Replies'));
      replies = [...replies, reply];
    }
    else replies = [reply];

    localStorage.setItem('Comment_Replies', JSON.stringify(replies));
  }

  getAllReplies(): IComment_Reply[]{
    if(!localStorage.getItem('Comment_Replies')) return [];

    return JSON.parse(localStorage.getItem('Comment_Replies'));
  }

  getReplyById(reply_id: number): IComment_Reply{
    if(!localStorage.getItem('Comment_Replies')) return null;

    return this.getAllReplies().find(reply => reply.id === reply_id);
  }

  getAllRepliesForComment(comment_id: number): IComment_Reply[]{
    if(!localStorage.getItem('Comment_Replies')) return [];

    const repliesArray: Array<IComment_Reply> = [];
    this.getAllReplies().forEach((reply: IComment_Reply) => {
      if(reply.comment_id === comment_id)
        repliesArray.push(reply);
    });
    return repliesArray;
  }

  getUserReplies(user_id: number): IComment_Reply[]{
    if(!localStorage.getItem('Comment_Replies')) return [];

    const repliesArray: Array<IComment_Reply> = [];
    this.getAllReplies().forEach((reply: IComment_Reply) => {
      if(reply.user_id === user_id)
        repliesArray.push(reply);
    });
    return repliesArray;
  }

  getReplyLastId() : number{
    let id: number = 1;
    if(!localStorage.getItem('Comment_Replies')) return id;

    const replies = this.getAllReplies();
    if(replies.length === 0) return id ;

    id = replies[replies.length - 1].id + 1;
    return id;
  }

  deleteCommentReplies(comment_id: number){
    this.getAllRepliesForComment(comment_id).forEach(reply => {
      this.deleteReply(reply.id);
      this.interaction.removeReplyInteractions(reply.id);
    })
  }

  deleteCommentReply(thread_id: number, reply_id: number){
    const replies = this.getAllReplies();
    const index = replies.findIndex(reply => reply.id === reply_id);

    replies.splice(index, 1);

    localStorage.setItem('Comment_Replies', JSON.stringify(replies));

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/thread', thread_id]);
    });
  }

  deleteReply(reply_id: number){
    const replies = this.getAllReplies();
    const index = replies.findIndex(reply => reply.id === reply_id);

    replies.splice(index, 1);

    localStorage.setItem('Comment_Replies', JSON.stringify(replies));
  }

  editReply(newReply: IComment_Reply){
    const replies = this.getAllReplies();
    const index = replies.findIndex(reply => reply.id === newReply.id);

    replies[index] = newReply;

    localStorage.setItem('Comment_Replies', JSON.stringify(replies));
  }

  likeReply(reply_id: number, add: boolean){
    const replies = this.getAllReplies();
    const reply = replies.find(reply => reply.id === reply_id);

    if(add)
      reply.up_votes++;
    else
      reply.up_votes--;

    const index = replies.findIndex((reply: IComment_Reply) => reply.user_id === reply_id);

    delete replies[index];
    replies[index] = reply;

    localStorage.setItem('Comment_Replies', JSON.stringify(replies));
  }

  dislikeReply(reply_id: number, add: boolean){
    const replies = this.getAllReplies();
    const reply = replies.find(reply => reply.id === reply_id);

    if(add)
      reply.down_votes++;
    else
      reply.down_votes--;

    const index = replies.findIndex((reply: IComment_Reply) => reply.user_id === reply_id);

    delete replies[index];
    replies[index] = reply;

    localStorage.setItem('Comment_Replies', JSON.stringify(replies));
  }

  getDiscussionParticipants(thread_id: number): Set<string>{
    const participantsSet: Set<string> = new Set();
    
    this.getAllCommentsForThread(thread_id).forEach(comment => {
      const commentUsername = this.userService.getUsernameById(comment.user_id);
      participantsSet.add(commentUsername);

      this.getAllRepliesForComment(comment.id).forEach(reply => {
        const replyUsername = this.userService.getUsernameById(reply.user_id);
        participantsSet.add(replyUsername);
      })
    })

    return participantsSet; 
  }

}
