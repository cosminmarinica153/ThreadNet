import { Component, Input, OnInit } from '@angular/core';
import { IThread } from '../../../interfaces/IThread';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread: IThread;
  username: string;
  isEditable: boolean;

  isEditing: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthentificationService,
              private userService: UserService, private threadService: ThreadsService, private interaction: InteractionsService) {
    this.isEditable = false;
    this.isEditing = false;
  }

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.thread.user_id);
    this.interaction.getThreadEdit().subscribe(value =>{
      this.isEditing = value;
    })
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  loadThread(id: number){
    this.router.navigate(['/thread', id]);
  }
}
