import { Component, Input, OnInit } from '@angular/core';
import { IThread } from '../../../interfaces/IThread';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread: IThread;
  username: string;
  isEditable: boolean;
  isFavourite: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthentificationService,
              private userService: UserService, private threadService: ThreadsService) {
    this.isEditable = false;
    this.isFavourite = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = this.userService.getUsernameById(this.thread.user_id);
      if(params['category_name'] === 'My Threads')
        this.isEditable = true;
    });
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  loadThread(id: number){
    this.router.navigate(['/thread', id]);
  }

  toggleFavourite(){
    this.isFavourite = !this.isFavourite;
  }

  deleteThread(){
    const isConfirmed = window.confirm('Are you sure you want to delete?');

    if (isConfirmed)
      this.threadService.deleteThread(this.thread.id);
  }

}
