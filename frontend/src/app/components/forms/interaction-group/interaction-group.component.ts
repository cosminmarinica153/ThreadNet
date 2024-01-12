import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IThread } from 'src/app/interfaces/TableInterfaces/IThread';
import { IComment } from 'src/app/interfaces/TableInterfaces/IComment';
import { ICommentReply } from 'src/app/interfaces/TableInterfaces/ICommentReply';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentsService } from 'src/app/services/comments.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { UserService } from 'src/app/services/user.service';
import { IFavouriteThread } from 'src/app/interfaces/TableInterfaces/IFavouriteThread';

@Component({
  selector: 'tn-interaction-group',
  templateUrl: './interaction-group.component.html',
  styleUrls: ['./interaction-group.component.css']
})
export class InteractionGroupComponent implements OnInit {
@Input() thread: IThread;
@Input() comment: IComment;
@Input() reply: ICommentReply;

  display: string;
  isEditable: boolean;
  url: string;

  isFavouriteThread: boolean;
  isLiked: boolean;
  isDisliked: boolean;

  upVotes: string;
  downVotes: string;
  editComponent: string;
  deleteComponent: string;

  constructor(private router: Router, private authService: AuthentificationService, private interaction: InteractionsService,
              private threadService: ThreadsService, private commentService: CommentsService, private userService: UserService) {
    this.isFavouriteThread = false;
    this.isLiked = false;
    this.isDisliked = false;
    this.isEditable = false;
    this.upVotes = "Up votes: ";
    this.downVotes= "Down votes: ";
    this.editComponent = "Edit ";
    this.deleteComponent = "Delete ";
  }


  ngOnInit() {
    this.url = this.router.url;
    this.authService.getUserId().subscribe(userId => {
      if(this.thread){
        this.threadService.getInteractions(this.thread.id).subscribe(data => {
          this.upVotes += data.upVotes;
          this.downVotes += data.downVotes;
        })

        this.editComponent += "thread";
        this.deleteComponent += "thread";

        if(this.thread.userId === userId)
          this.isEditable = true;
      }
      if(this.comment){
        this.commentService.getCommentInteractions(this.comment.id).subscribe(data => {
          this.upVotes += data.upVotes;
          this.downVotes += data.downVotes;
        })

        this.editComponent += "comment";
        this.deleteComponent += "comment";

        if(this.comment.userId === userId)
          this.isEditable = true;
      }
      if(this.reply){
        this.commentService.getCommentReplyInteractions(this.reply.id).subscribe(data => {
          this.upVotes += data.upVotes;
          this.downVotes += data.downVotes;
        })

        this.editComponent += "reply";
        this.deleteComponent += "reply";

        if(this.reply.userId === userId)
          this.isEditable = true;
      }
      if(!this.thread && !this.isEditable) this.display = 'flex-end';
    });
  }

  isLoggedIn(): boolean{
    if(this.authService.isLoggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }

  edit(){
    if(this.thread) this.interaction.setThreadEdit(true);
    if(this.comment) this.interaction.setCommentEdit(true);
    if(this.reply) this.interaction.setReplyEdit(true);
  }

  delete(){
    const isConfirmed = window.confirm('Are you sure you want to delete?');

    if (isConfirmed){
      if(this.thread) this.threadService.deleteThread(this.thread.id);
      if(this.comment) this.commentService.deleteComment(this.comment.id);
      if(this.reply) this.commentService.deleteCommentReply(this.reply.id);
    }

    this.refresh();
  }

  upVote(){
    if(!this.isLoggedIn()) return;
    if(this.thread){

    }

    if(this.comment){

    }

    if(this.reply){

    }

    this.refresh();
  }

  downVote(){
    if(!this.isLoggedIn()) return;
    if(this.thread){

    }

    if(this.comment){

    }

    if(this.reply){

    }

    this.refresh();
  }

  addToFavourites(){
    if(!this.isLoggedIn()) return;

    this.authService.getUserId().subscribe(id => {
      const favouriteThread: IFavouriteThread = {
        userId : id,
        threadId : this.thread.id
      }

      this.userService.postFavouriteThread(favouriteThread)

      this.refresh();

    })

  }

  shareThread(){

  }

  refresh(){
    let url = this.router.url;
    if(url == "/category/My%20Favourites") url = "/category/My Favourites";
    this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

}
