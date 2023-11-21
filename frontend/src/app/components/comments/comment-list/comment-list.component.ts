import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { IComment } from '../../../interfaces/IComment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tn-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Array<IComment>;
  thread_id: number;

  constructor(private route: ActivatedRoute, private commentsService: CommentsService) { this.comments = []; }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.thread_id = +params['id'];
      this.commentsService.getAllComments(this.thread_id).subscribe(
        comments => {
          this.comments = comments;
        }
      )
    });
  }

}
