import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { IThread } from 'src/app/interfaces/TableInterfaces/IThread';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {
  thread: IThread;
  user: IUser;

  isLiked: boolean;
  isDisliked: boolean;

  addComment: boolean;
  isEditing: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthentificationService,
              private threadService: ThreadsService, private userService: UserService, private interaction: InteractionsService) {
                this.isLiked = false;
                this.isDisliked = false;
                this.addComment = false;
                this.isEditing = false;
              }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const threadId = +params['id'];
      this.threadService.getOne(threadId).subscribe(
        data => {
          this.thread = data;
      });

      this.userService.getOne(this.thread.userId).subscribe(
        data => {
          this.user = data;
        }
      );

      this.interaction.getThreadEdit().subscribe(value => {
        this.isEditing = value;
      });
    });
  }

  toggleCreateComment(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);

    this.addComment = !this.addComment;
  }

}
