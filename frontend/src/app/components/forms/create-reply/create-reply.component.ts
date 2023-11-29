import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment_Reply } from 'src/app/interfaces/IComment_Reply';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'tn-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit {
  replyForm: FormGroup;
  comment: IComment_Reply;
  submit: boolean;

  reply_id: number;
  user_id: number;
@Input()comment_id: number;

  thread_id: number;

  get content(){
    return this.replyForm.get('content') as FormControl;
  }

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
              private authService: AuthentificationService, private commentService: CommentsService) {
                this.submit = false;
              }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.thread_id = +params['id'];
      this.user_id = this.authService.getUserId();
      this.reply_id = this.commentService.getReplyLastId(); 
      this.createReplyForm();
    });
  }

  createReplyForm(){
    this.replyForm = this.fb.group({
      content: [null, [Validators.required, Validators.minLength(1)]],
    })
  }

  onCreate(){
    this.submit = true;

    if(!this.replyForm.valid) return

    this.commentService.addReply(this.replyData());
    this.submit = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/thread', this.thread_id]);
    });
  }

  replyData(): IComment_Reply{
    return this.comment = {
      id: this.reply_id,
      user_id: this.user_id,
      comment_id: this.comment_id,
      comment_date: new Date(),
      is_edited: false,
      up_votes: 0,
      down_votes: 0,
      content: this.content.value,
    }
  }
}
