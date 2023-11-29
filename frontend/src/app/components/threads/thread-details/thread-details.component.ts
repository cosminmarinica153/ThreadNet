import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IThread } from 'src/app/interfaces/IThread';
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
  thread_id: number;
  username: string;

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
      this.thread_id = +params['id'];
      this.thread = this.threadService.getThreadById(this.thread_id);
      this.username = this.userService.getUsernameById(this.thread.user_id);
      this.interaction.getThreadEdit().subscribe(value => {
        this.isEditing = value;
      });
    });
  }

  likePost(){
    this.isLiked = !this.isLiked;
    if(this.isLiked === true && this.isDisliked === true)
      this.isDisliked = false;
  }
  dislikePost(){
    this.isDisliked = !this.isDisliked;
    if(this.isDisliked === true && this.isLiked === true)
      this.isLiked = false;
  }

  toggleCreateComment(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);

    this.addComment = !this.addComment;
  }

}
