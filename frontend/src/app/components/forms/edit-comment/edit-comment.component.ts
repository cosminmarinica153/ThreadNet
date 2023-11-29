import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/IComment';
import { CommentsService } from 'src/app/services/comments.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
@Input() comment: IComment;

  commentForm: FormGroup;
  username: string;
  newComment: IComment;
  submit: boolean;

  get content(){
    return this.commentForm.get('content') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
              private commentService: CommentsService, private interaction: InteractionsService) {
                this.submit = false;
              }

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.comment.user_id);
    this.createCommentForm();
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      content: [this.comment.content, [Validators.required, Validators.minLength(1)]],
    })
  }

  onCreate(){
    this.submit = true;

    if(!this.commentForm.valid) return

    this.commentService.editComment(this.commentData());
    this.interaction.setCommentEdit(false);
    this.submit = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/thread', this.comment.thread_id]);
    });
  }

  commentData(): IComment{
    return this.newComment = {
      id: this.comment.id,
      user_id: this.comment.user_id,
      thread_id: this.comment.thread_id,
      comment_date: new Date(),
      is_edited: true,
      up_votes: this.comment.up_votes,
      down_votes: this.comment.down_votes,
      content: this.content.value,
    }
  }

}
