import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateCommentReplyDto } from 'src/app/interfaces/Dto/ICreateCommentReplyDto';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'tn-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit {
  replyForm: FormGroup;
  comment: ICreateCommentReplyDto;
  submit: boolean;

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
      this.authService.getUserId().subscribe(userId => {
        this.user_id = userId;
      })
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

    this.commentService.postCommentReply(this.replyData());
    this.submit = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/thread', this.thread_id]);
    });
  }

  replyData(): ICreateCommentReplyDto{
    return this.comment = {
      userId: this.user_id,
      commentId: this.comment_id,
      content: this.content.value,
      uploadDate: new Date(),
      isEdited: 0,
    }
  }
}
