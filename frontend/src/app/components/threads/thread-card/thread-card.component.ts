import { Component, Input, OnInit } from '@angular/core';
import { IThread } from '../../../interfaces/IThread';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread: IThread;
  username: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.thread.user_id);
  }

  loadThread(id: number){
    this.router.navigate(['/thread', id]);
  }

}
