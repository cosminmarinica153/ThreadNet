import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IThread } from 'src/app/interfaces/IThread';
import { ThreadsService } from 'src/app/services/threads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {
  thread: IThread;
  thread_id: number;
  username: string;

  constructor(private route: ActivatedRoute, private threadService: ThreadsService, private userService: UserService) { 
    // Initializer for thread id to avoid errors and commit page not found  ------------ FIX
    this.thread = {
      id : -1,
      category_id: -1,
      user_id: -1,
      thread_date: "",
      title: "",
      content: ""
    }}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.thread_id = +params['id'];

      this.thread = this.threadService.getThreadById(this.thread_id);
      this.username = this.userService.getUsernameById(this.thread.user_id);
    });
    
  }
}
