import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/IComment';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input() comment: IComment;
  username: string;
  url: string;

  addReply: boolean;
  isEditing: boolean;

  constructor(private router: Router, private authService: AuthentificationService , private userService: UserService,
              private interaction: InteractionsService) {
    this.addReply = false;
    this.isEditing = false;
  }

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.comment.user_id);
    this.interaction.getCommentEdit().subscribe(value =>{
      this.isEditing = value;
    });
    this.url = this.router.url;
  }

  toggleCreateReply(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    this.addReply = !this.addReply;
  }

}
