import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateCommentDto } from 'src/app/interfaces/Dto/ICreateCommentDto';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'tn-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup;
  comment: ICreateCommentDto;
  submit: boolean;

  user_id: number;
  thread_id: number;

  get content(){
    return this.commentForm.get('content') as FormControl;
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
      this.createCommentForm();
    });
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      content: [null, [Validators.required, Validators.minLength(1)]],
    })
  }

  onCreate(){
    this.submit = true;

    if(!this.commentForm.valid) return

    this.commentService.postComment(this.commentData());
    this.submit = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/thread', this.thread_id]);
    });
  }

  commentData(): ICreateCommentDto{
    return this.comment = {
      userId: this.user_id,
      threadId: this.thread_id,
      content: this.content.value,
      uploadDate: new Date(),
      isEdited: 0
    }
  }

}
