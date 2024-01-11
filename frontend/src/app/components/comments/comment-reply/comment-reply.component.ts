import { Component, Input, OnInit } from '@angular/core';
import { ICommentReply } from 'src/app/interfaces/TableInterfaces/ICommentReply';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.css']
})
export class CommentReplyComponent implements OnInit {
@Input() reply: ICommentReply;
  user: IUser;

  isEditing: boolean

  constructor(private userService: UserService, private interaction: InteractionsService) {
    this.isEditing = false;
  }

  ngOnInit() {
    this.userService.getOne(this.reply.userId).subscribe(data => {
      this.user = data;
    });

    this.interaction.getReplyEdit().subscribe(value =>{
      this.isEditing = value;
    })
  }

}
