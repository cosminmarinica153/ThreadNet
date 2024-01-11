import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'tn-discussion-participants',
  templateUrl: './discussion-participants.component.html',
  styleUrls: ['./discussion-participants.component.css']
})
export class DiscussionParticipantsComponent implements OnInit {
  participantList: IUser[];
  thread_id: number;

  constructor(private route: ActivatedRoute, private threadService: ThreadsService) { this.participantList = []; }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.thread_id = +params['id'];

      this.threadService.getDiscussionParticipants(this.thread_id).subscribe(
        data => {
          this.participantList = data;
        }
      )

      // Method to add user creator to list
    });
  }
}
