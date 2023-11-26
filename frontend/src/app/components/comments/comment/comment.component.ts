import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/IComment';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input() comment: IComment;
  username: string;

  addReply: boolean;

  constructor(private router: Router, private userService: UserService, private authService: AuthentificationService) {
    this.addReply = false;
  }

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.comment.user_id);
  }

  toggleCreateReply(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    this.addReply = !this.addReply;
  }

}
