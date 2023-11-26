import { Component, Input, OnInit } from '@angular/core';
import { IComment_Reply } from 'src/app/interfaces/IComment_Reply';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'tn-comment-reply-list',
  templateUrl: './comment-reply-list.component.html',
  styleUrls: ['./comment-reply-list.component.css']
})
export class CommentReplyListComponent implements OnInit {
@Input() comment_id: number;
  replies: Array<IComment_Reply>;

  constructor(private replyService: CommentsService) { }

  ngOnInit() {
    this.replies = this.replyService.getAllRepliesForComment(this.comment_id);
  }

}
