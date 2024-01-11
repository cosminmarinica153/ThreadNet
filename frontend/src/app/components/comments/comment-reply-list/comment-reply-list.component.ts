import { Component, Input, OnInit } from '@angular/core';
import { ICommentReply } from 'src/app/interfaces/TableInterfaces/ICommentReply';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'tn-comment-reply-list',
  templateUrl: './comment-reply-list.component.html',
  styleUrls: ['./comment-reply-list.component.css']
})
export class CommentReplyListComponent implements OnInit {
@Input() comment_id: number;
  replies: Array<ICommentReply>;

  constructor(private commentService: CommentsService) { }

  ngOnInit() {
    this.commentService.getCommentReplies(this.comment_id).subscribe(data => {
      this.replies = data;
    });
  }

}
