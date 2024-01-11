import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { IComment } from '../../../interfaces/TableInterfaces/IComment';
import { ActivatedRoute } from '@angular/router';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'tn-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Array<IComment>;

  constructor(private route: ActivatedRoute, private threadService: ThreadsService) { this.comments = []; }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const threadId = +params['id'];
      this.threadService.getComments(threadId).subscribe(data => {
        this.comments = data;
      })
    });
  }

}
