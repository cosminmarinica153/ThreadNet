import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  friends: Array<string>;
  user: IUser;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private interaction: InteractionsService) {
    this.friends = [];
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user = this.userService.getUserByUsername(params['username']);
      const friendsIdArray = this.interaction.getUserInteractions(this.user.id).friends;

      console.log();

      friendsIdArray.forEach(id => {
        this.friends.push(this.userService.getUsernameById(id));
      })
    });
  }

}
