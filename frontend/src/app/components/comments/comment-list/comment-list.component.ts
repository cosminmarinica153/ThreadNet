import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { IComment } from '../../../interfaces/IComment';

@Component({
  selector: 'tn-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: Array<IComment>;

  constructor(private commentsService: CommentsService) { this.comments = []; }

  ngOnInit() {
    this.commentsService.getAllComments().subscribe(
      data => {
        this.comments = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

}
