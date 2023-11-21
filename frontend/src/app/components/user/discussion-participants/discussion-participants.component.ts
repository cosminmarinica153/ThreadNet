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
  participantList: Array<string>;
  thread_id: number;

  constructor(private route: ActivatedRoute, private commentsService: CommentsService,
              private userService: UserService, private threadService: ThreadsService) { this.participantList = [] }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.thread_id = +params['id'];
      this.commentsService.getDiscussionParticipants(this.thread_id).subscribe(
        data => {
          this.participantList = data;
        })
      this.threadService.getThreadById(this.thread_id).subscribe(
        data => {
          this.userService.getUsernameById(data.user_id).subscribe(
            username => {
              this.participantList.push(username);
            })
        })
    });
  }

}
