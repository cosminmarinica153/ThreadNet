import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IComment_Reply } from 'src/app/interfaces/IComment_Reply';
import { CommentsService } from 'src/app/services/comments.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.css']
})
export class EditReplyComponent implements OnInit {
@Input() reply: IComment_Reply;

  replyForm: FormGroup;
  username: string;
  newReply: IComment_Reply;
  submit: boolean;

  get content(){
    return this.replyForm.get('content') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
              private commentService: CommentsService, private interaction: InteractionsService) {
                this.submit = false;
              }

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.reply.user_id);
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

    this.commentService.editReply(this.replyData());
    this.interaction.setReplyEdit(false);
    this.submit = false;

    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([url]);
    });
  }

  replyData(): IComment_Reply{
    return this.newReply = {
      id: this.reply.id,
      user_id: this.reply.user_id,
      comment_id: this.reply.comment_id,
      comment_date: new Date(),
      is_edited: true,
      up_votes: this.reply.up_votes,
      down_votes: this.reply.down_votes,
      content: this.content.value,
    }
  }

}