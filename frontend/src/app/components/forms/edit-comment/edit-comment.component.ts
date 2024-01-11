import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUpdateCommentDto } from 'src/app/interfaces/Dto/IUpdateCommentDto';
import { IComment } from 'src/app/interfaces/TableInterfaces/IComment';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
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
  user: IUser;
  newComment: IUpdateCommentDto;
  submit: boolean;

  get content(){
    return this.commentForm.get('content') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
              private commentService: CommentsService) {
                this.submit = false;
              }

  ngOnInit() {
    this.userService.getOne(this.comment.userId).subscribe(data => {
      this.user = data;
    });
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

    this.commentService.putComment(this.commentData());
    this.submit = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/thread', this.comment.threadId]);
    });
  }

  commentData(): IUpdateCommentDto{
    return this.newComment = {
      id: this.comment.id,
      content: this.content.value,
    }
  }

}
