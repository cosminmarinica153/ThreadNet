import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/IComment';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'tn-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup;
  comment: IComment;
  submit: boolean;

  comment_id: number;
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
      this.user_id = this.authService.getUserId();
      this.comment_id = this.commentService.getCommentLastId(); 
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

    this.commentService.addComment(this.commentData());
    this.submit = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/thread', this.thread_id]);
    });
  }

  commentData(): IComment{
    return this.comment = {
      id: this.comment_id,
      user_id: this.user_id,
      thread_id: this.thread_id,
      comment_date: "01-01-2001",
      is_edited: false,
      up_votes: 0,
      down_votes: 0,
      content: this.content.value,
    }
  }

}
