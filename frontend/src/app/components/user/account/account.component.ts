import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComment } from 'src/app/interfaces/IComment';
import { IComment_Reply } from 'src/app/interfaces/IComment_Reply';
import { IInteraction } from 'src/app/interfaces/IInteraction';
import { IThread } from 'src/app/interfaces/IThread';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthentificationService } from 'src/app/services/authentification.service';

import { CommentsService } from 'src/app/services/comments.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  threads: Array<IThread>
  comments: Array<IComment>
  replies: Array<IComment_Reply>

  createdThreads: number;
  createdReplies: number;

  user: IUser
  interactionsCount: object;
  impressionsCount: object;

  constructor(private route: ActivatedRoute, private authService: AuthentificationService,
              private threadService: ThreadsService, private commentService: CommentsService,
              private interactionService: InteractionsService,private userService: UserService) {
    this.threads = [];
    this.comments = [];
    this.replies = [];
    this.interactionsCount = {
      liked_threads: 0,
      disliked_threads: 0,
      liked_replies: 0,
      disliked_replies: 0,
      created_threads: 0,
      created_replies: 0
    };
    this.impressionsCount = {
      liked_threads: 0,
      disliked_threads: 0,
      liked_replies: 0,
      disliked_replies: 0
    };
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user = this.userService.getUserByUsername(params['username']);
      
      this.threads = this.threadService.getUserThreads(this.user.id);
      this.comments = this.commentService.getUserComments(this.user.id);
      this.replies = this.commentService.getUserReplies(this.user.id);

      this.createdThreads = this.threads.length;
      this.createdReplies = this.comments.length + this.replies.length;

      this.interactionsCount = this.interactionService.getUserInteractionsObj(this.user.id);
      this.impressionsCount = this.getImpressions();
    });

  }

  getImpressions(): Object{
    const interactions = this.interactionService.getAllInteractions();

    var likedThreads = 0;
    var dislikedThreads = 0;
    var likedReplies = 0;
    var dislikedReplies = 0;

    interactions.forEach(interaction => {
      interaction.liked_threads.forEach(thread_id => {
        if(this.threadService.getThreadById(thread_id).user_id === this.user.id) likedThreads++;
      });
      interaction.disliked_threads.forEach(thread_id => {
        if(this.threadService.getThreadById(thread_id).user_id === this.user.id) dislikedThreads++;
      });
      interaction.liked_comments.forEach(comment_id => {
        if(this.commentService.getCommentById(comment_id).user_id === this.user.id) likedReplies++;
      });
      interaction.disliked_comments.forEach(comment_id => {
        if(this.commentService.getCommentById(comment_id).user_id === this.user.id) dislikedReplies++;
      });
      interaction.liked_replies.forEach(reply_id => {
        if(this.commentService.getReplyById(reply_id).user_id === this.user.id) likedReplies++;
      });
      interaction.disliked_replies.forEach(reply_id => {
        if(this.commentService.getReplyById(reply_id).user_id === this.user.id) dislikedReplies++;
      });
    })

    this.impressionsCount = {
      liked_threads: likedThreads,
      disliked_threads: dislikedThreads,
      liked_replies: likedReplies,
      disliked_replies: dislikedReplies
    }
      
    return this.impressionsCount;
  }

  isUserProfile(){
    if(this.authService.getUserId() === this.user.id)
      return true;
    return false;
  }

  isUserFriend(){
    return this.interactionService.isUserFriend(this.authService.getUserId(), this.user.id);
  }

  addFriend(){
    this.interactionService.addFriend(this.user.id);
  }

  removeFriend(){
    this.interactionService.removeFriend(this.user.id);
  }
}
