import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/IComment';
import { IComment_Reply } from 'src/app/interfaces/IComment_Reply';
import { IThread } from 'src/app/interfaces/IThread';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentsService } from 'src/app/services/comments.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'tn-interaction-group',
  templateUrl: './interaction-group.component.html',
  styleUrls: ['./interaction-group.component.css']
})
export class InteractionGroupComponent implements OnInit {
@Input() thread: IThread;
@Input() comment: IComment;
@Input() reply: IComment_Reply;

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
              private threadService: ThreadsService, private commentService: CommentsService) {
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
    if(this.thread){
      this.upVotes += this.thread.up_votes;
      this.downVotes += this.thread.down_votes;
      this.editComponent += "thread";
      this.deleteComponent += "thread";

      this.isLiked = this.interaction.isLikedThread(this.thread.id);
      this.isDisliked = this.interaction.isDislikedThread(this.thread.id);
      this.isFavouriteThread = this.interaction.isFavouriteThread(this.thread.id)

      if(this.thread.user_id === this.authService.getUserId())
        this.isEditable = true;
    }
    if(this.comment){
      this.upVotes += this.comment.up_votes;
      this.downVotes += this.comment.down_votes;
      this.editComponent += "comment";
      this.deleteComponent += "comment";

      this.isLiked = this.interaction.isLikedComment(this.comment.id);
      this.isDisliked = this.interaction.isDislikedComment(this.comment.id);

      if(this.comment.user_id === this.authService.getUserId())
        this.isEditable = true;
    }
    if(this.reply){
      this.upVotes += this.reply.up_votes;
      this.downVotes += this.reply.down_votes;
      this.editComponent += "reply";
      this.deleteComponent += "reply";

      this.isLiked = this.interaction.isLikedReply(this.reply.id);
      this.isDisliked = this.interaction.isDislikedReply(this.reply.id);

      if(this.reply.user_id === this.authService.getUserId())
        this.isEditable = true;
    }
    if(!this.thread && !this.isEditable) this.display = 'flex-end';

  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
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
      if(this.reply) this.commentService.deleteReply(this.reply.id);
    }
      
    this.refresh();
  }

  upVote(){
    if(this.thread){
      if(this.isLiked){
        this.threadService.likeThread(this.thread.id, false);
      }else if(this.isDisliked){
        this.threadService.likeThread(this.thread.id, true);
        this.threadService.dislikeThread(this.thread.id, false);
        this.interaction.dislikeThread(this.thread.id);
      }else
        this.threadService.likeThread(this.thread.id, true)

      this.interaction.likeThread(this.thread.id);

      this.isLiked = this.interaction.isLikedThread(this.thread.id);
      this.isDisliked = this.interaction.isDislikedThread(this.thread.id);
    }

    if(this.comment){
      if(this.isLiked){
        this.commentService.likeComment(this.comment.id, false);
      }else if(this.isDisliked){
        this.commentService.likeComment(this.comment.id, true);
        this.commentService.dislikeComment(this.comment.id, false);
        this.interaction.dislikeComment(this.comment.id);
      }else
        this.commentService.likeComment(this.comment.id, true)

      this.interaction.likeComment(this.comment.id);

      this.isLiked = this.interaction.isLikedComment(this.comment.id);
      this.isDisliked = this.interaction.isDislikedComment(this.comment.id);
    }

    if(this.reply){
      if(this.isLiked){
        this.commentService.likeReply(this.reply.id, false);
      }else if(this.isDisliked){
        this.commentService.likeReply(this.reply.id, true);
        this.commentService.dislikeReply(this.reply.id, false);
        this.interaction.dislikeReply(this.reply.id);
      }else
        this.commentService.likeReply(this.reply.id, true)

      this.interaction.likeReply(this.reply.id);

      this.isLiked = this.interaction.isLikedReply(this.reply.id);
      this.isDisliked = this.interaction.isDislikedReply(this.reply.id);
    }

    this.refresh();
  }

  downVote(){
    if(this.thread){
      if(this.isDisliked){
        this.threadService.dislikeThread(this.thread.id, false);
      }else if(this.isLiked){
        this.threadService.dislikeThread(this.thread.id, true);
        this.threadService.likeThread(this.thread.id, false);
        this.interaction.likeThread(this.thread.id);
      }else
        this.threadService.dislikeThread(this.thread.id, true)

      this.interaction.dislikeThread(this.thread.id);

      this.isLiked = this.interaction.isLikedThread(this.thread.id)
      this.isDisliked = this.interaction.isDislikedThread(this.thread.id);
    }

    if(this.comment){
      if(this.isDisliked){
        this.commentService.dislikeComment(this.comment.id, false);
      }else if(this.isLiked){
        this.commentService.dislikeComment(this.comment.id, true);
        this.commentService.likeComment(this.comment.id, false);
        this.interaction.likeComment(this.comment.id);
      }else
        this.commentService.dislikeComment(this.comment.id, true)

      this.interaction.dislikeComment(this.comment.id);

      this.isLiked = this.interaction.isLikedComment(this.comment.id)
      this.isDisliked = this.interaction.isDislikedComment(this.comment.id);
    }

    if(this.reply){
      if(this.isDisliked){
        this.commentService.dislikeReply(this.reply.id, false);
      }else if(this.isLiked){
        this.commentService.dislikeReply(this.reply.id, true);
        this.commentService.likeReply(this.reply.id, false);
        this.interaction.likeReply(this.reply.id);
      }else
        this.commentService.dislikeReply(this.reply.id, true)

      this.interaction.dislikeReply(this.reply.id);

      this.isLiked = this.interaction.isLikedReply(this.reply.id)
      this.isDisliked = this.interaction.isDislikedReply(this.reply.id);
    }

    this.refresh();
  }

  addToFavourites(){
    this.interaction.favouriteThread(this.thread.id);
    this.isFavouriteThread = this.interaction.isFavouriteThread(this.thread.id);

    this.refresh();
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
