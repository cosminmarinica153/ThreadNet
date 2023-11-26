import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/interfaces/IComment';
import { CommentsService } from 'src/app/services/comments.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-discussion-participants',
  templateUrl: './discussion-participants.component.html',
  styleUrls: ['./discussion-participants.component.css']
})
export class DiscussionParticipantsComponent implements OnInit {
  participantList: Set<string>;
  thread_id: number;

  constructor(private route: ActivatedRoute, private commentsService: CommentsService,
              private userService: UserService, private threadService: ThreadsService) { this.participantList = new Set() }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.thread_id = +params['id'];
      
      this.participantList = this.commentsService.getDiscussionParticipants(this.thread_id);
      this.participantList.add(this.userService.getUsernameById(this.threadService.getThreadById(this.thread_id).user_id));
    });
  }

}
