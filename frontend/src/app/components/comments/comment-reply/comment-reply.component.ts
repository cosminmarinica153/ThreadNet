import { Component, Input, OnInit } from '@angular/core';
import { IComment_Reply } from 'src/app/interfaces/IComment_Reply';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.css']
})
export class CommentReplyComponent implements OnInit {
@Input() reply: IComment_Reply;
  username: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getUsernameById(this.reply.user_id);
  }

}
