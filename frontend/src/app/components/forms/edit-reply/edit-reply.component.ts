import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUpdateCommentDto } from 'src/app/interfaces/Dto/IUpdateCommentDto';
import { ICommentReply } from 'src/app/interfaces/TableInterfaces/ICommentReply';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { CommentsService } from 'src/app/services/comments.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.css']
})
export class EditReplyComponent implements OnInit {
@Input() reply: ICommentReply;

  replyForm: FormGroup;
  user: IUser;
  newReply: IUpdateCommentDto;
  submit: boolean;

  get content(){
    return this.replyForm.get('content') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
              private commentService: CommentsService) {
                this.submit = false;
              }

  ngOnInit() {
    this.userService.getOne(this.reply.userId).subscribe(data => {
      this.user = data;
    });
    this.createReplyForm();
  }

  createReplyForm(){
    this.replyForm = this.fb.group({
      content: [this.reply.content, [Validators.required, Validators.minLength(1)]],
    })
  }

  onCreate(){
    this.submit = true;

    if(!this.replyForm.valid) return

    this.commentService.putComment(this.replyData());
    this.submit = false;

    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([url]);
    });
  }

  replyData(): IUpdateCommentDto{
    return this.newReply = {
      id: this.reply.id,
      content: this.content.value,
    }
  }

}
