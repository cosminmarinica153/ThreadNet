import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/IComment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input() comment: IComment;
  username: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsernameById(this.comment.user_id).subscribe(
      data => {
        this.username = data;
      }
    )
  }

}
