import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { IThread } from 'src/app/interfaces/TableInterfaces/IThread';
import { IUserComment } from 'src/app/interfaces/MiscInterfaces/IUserComment';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

import { NotFoundError } from 'rxjs';

@Component({
  selector: 'tn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  threads: Array<IThread>
  comments: Array<IUserComment>

  user: IUser

  constructor(private route: ActivatedRoute, private authService: AuthentificationService,
              private userService: UserService) {
    this.threads = [];
    this.comments = [];
   }

  ngOnInit() {
    throw NotFoundError;
    this.route.params.subscribe((params) => {
      //this.user = this.userService.getUserByUsername(params['username']);
    });

  }

  isUserProfile(){
    if(this.authService.getUserId() === this.user.id)
      return true;
    return false;
  }
}
